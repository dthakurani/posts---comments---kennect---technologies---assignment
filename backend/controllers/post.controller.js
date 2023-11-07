const { commonErrorHandler } = require('../utilities/errorHandler');
const postService = require('../services/post.service');

const createPost = async function (req, res, next) {
  try {
    const { user } = req;
    const post = await postService.createPost(user, req.body);

    req.data = post;

    next();
  } catch (error) {
    console.log('✔️ ~ file: post.controller.js: ~ createPost ~ error:', error);

    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

const addComment = async function (req, res, next) {
  try {
    const { user } = req;
    const { id } = req.params;
    const comment = await postService.addComment(user, id, req.body);

    req.data = comment;

    next();
  } catch (error) {
    console.log('✔️ ~ file: post.controller.js: ~ addComment ~ error:', error);

    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

const postDetails = async function (req, res, next) {
  try {
    const { id } = req.params;
    const post = await postService.postDetails(id, req.body);

    req.data = post;

    next();
  } catch (error) {
    console.log('✔️ ~ file: post.controller.js: ~ postDetails ~ error:', error);

    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

const findPosts = async function (req, res, next) {
  try {
    const { user } = req;
    const posts = await postService.findPosts(user, req.query);

    req.data = posts;

    next();
  } catch (error) {
    console.log('✔️ ~ file: post.controller.js: ~ findPosts ~ error:', error);

    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

module.exports = { createPost, addComment, postDetails, findPosts };
