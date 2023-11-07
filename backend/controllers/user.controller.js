const { commonErrorHandler } = require('../utilities/errorHandler');
const userService = require('../services/user.service');

const registerUser = async function (req, res, next) {
  try {
    const user = await userService.registerUser(req.body);

    req.statusCode = 201;
    req.message = 'Registration successful';
    req.data = user;

    next();
  } catch (error) {
    console.log(
      '✔️ ~ file: user.controller.js: ~ registerUser ~ error:',
      error,
    );
    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

const loginUser = async function (req, res, next) {
  try {
    const user = await userService.loginUser(req.body);

    req.data = user;

    next();
  } catch (error) {
    console.log('✔️ ~ file: user.controller.js: ~ loginUser ~ error:', error);

    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

const getUserDataFromToken = async function (req, res, next) {
  try {
    const { user } = req;

    req.data = {
      id: user._id,
      email: user.email,
      name: user.name,
      created_at: user.createdAt,
    };
    next();
  } catch (error) {
    console.log(
      '✔️ ~ file: user.controller.js ~ getUserDataFromToken ~ error:',
      error,
    );

    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

const generateAccessToken = async function (req, res, next) {
  try {
    const { user } = req;

    const accessToken = await userService.generateAccessToken(user._id);

    req.data = { accessToken };
    next();
  } catch (error) {
    console.log(
      '✔️ ~ file: user.controller.js ~ generateAccessToken ~ error:',
      error,
    );
    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserDataFromToken,
  generateAccessToken,
};
