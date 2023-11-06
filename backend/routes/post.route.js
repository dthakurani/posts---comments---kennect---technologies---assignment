const express = require('express');

const router = express.Router();

const postValidators = require('../validators/post.validator');
const postControllers = require('../controllers/post.controller');
const { genericResponse } = require('../utilities/responseHandler');
const { checkAccessToken } = require('../middlewares/authentication');

router.post(
  '/',
  checkAccessToken,
  postValidators.createPost,
  postControllers.createPost,
  genericResponse,
);

router.post(
  '/:id/comment',
  checkAccessToken,
  postValidators.addComment,
  postControllers.addComment,
  genericResponse,
);

router.get(
  '/:id',
  checkAccessToken,
  postControllers.postDetails,
  genericResponse,
);

router.get('/', checkAccessToken, postControllers.findPosts, genericResponse);

module.exports = router;
