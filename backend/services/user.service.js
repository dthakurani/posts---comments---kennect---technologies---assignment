const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { CustomException } = require('../utilities/errorHandler');
const { User } = require('../models/user');

const generateToken = async (userId) => {
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '24h',
  });

  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });

  const tokens = {
    refreshToken,
    accessToken,
  };

  return tokens;
};

// Register a new user
const registerUser = async function (body) {
  const userAlreadyExists = await User.findOne({ email: body.email });

  if (userAlreadyExists) {
    throw new CustomException('User with this email already exists', 409);
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const newUser = new User({ ...body, password: hashedPassword });

  await newUser.save();

  const tokens = await generateToken(newUser._id);

  return {
    id: newUser._id,
    email: newUser.email,
    name: newUser.name,
    tokens,
  };
};

// Login with an existing user
const loginUser = async function (body) {
  const { email, password } = body;

  const userAlreadyExists = await User.findOne({ email });

  if (!userAlreadyExists) {
    throw new CustomException('User not found', 404);
  }

  const passwordMatch = await bcrypt.compare(
    password,
    userAlreadyExists.password,
  );

  if (!passwordMatch) {
    throw new CustomException('Email or Password is incorrect.', 401);
  }

  const tokens = await generateToken(userAlreadyExists._id);

  return {
    id: userAlreadyExists._id,
    email: userAlreadyExists.email,
    name: userAlreadyExists.name,
    tokens,
  };
};

// generate access token
const generateAccessToken = async function (user) {
  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '1h',
    },
  );

  return accessToken;
};

module.exports = {
  registerUser,
  loginUser,
  generateAccessToken,
};
