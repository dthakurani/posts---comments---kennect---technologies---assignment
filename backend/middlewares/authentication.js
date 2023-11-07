const jwt = require('jsonwebtoken');

const { User } = require('../models/user');
const {
  CustomException,
  commonErrorHandler,
} = require('../utilities/errorHandler');

const checkAccessToken = async function (req, res, next) {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : null;

    if (!token) {
      throw new CustomException('Authentication required', 401);
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken.userId);

    if (!user) {
      throw new CustomException('User not found', 404);
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('✔️ ~ file: auth.js:24 ~ authenticate ~ error:', error);

    const statusCode = error.statusCode || 401;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

const checkRefreshToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : null;

    if (!token) {
      throw new CustomException('Access denied', 401);
    }

    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decodedToken.userId);

    if (!user) {
      throw new CustomException('User not found', 404);
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('checkRefreshTOken error:', error);
    const statusCode = error.statusCode || 401;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

module.exports = { checkAccessToken, checkRefreshToken };
