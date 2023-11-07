const express = require('express');

const router = express.Router();

const userValidators = require('../validators/user.validator');
const userController = require('../controllers/user.controller');
const { genericResponse } = require('../utilities/responseHandler');
const {
  checkRefreshToken,
  checkAccessToken,
} = require('../middlewares/authentication');

router.post(
  '/',
  userValidators.registerUser,
  userController.registerUser,
  genericResponse,
);

router.post(
  '/login',
  userValidators.loginUser,
  userController.loginUser,
  genericResponse,
);

router.get(
  '/generate-access-token',
  checkRefreshToken,
  userController.generateAccessToken,
  genericResponse,
);

router.get(
  '/user-info',
  checkAccessToken,
  userController.getUserDataFromToken,
  genericResponse,
);

module.exports = router;
