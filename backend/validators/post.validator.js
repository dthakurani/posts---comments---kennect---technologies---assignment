const Joi = require('joi');

const { validateRequest } = require('../utilities/commonFunctions');

const requestParameterTypes = {
  body: 'body',
  query: 'query',
  params: 'param',
};

const createPost = function (req, res, next) {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });

  return validateRequest(req, res, next, schema, requestParameterTypes.body);
};

const addComment = function (req, res, next) {
  const schema = Joi.object().keys({
    content: Joi.string().required(),
  });

  return validateRequest(req, res, next, schema, requestParameterTypes.body);
};

const findPosts = function (req, res, next) {
  const schema = Joi.object().keys({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sortBy: Joi.string().valid('createdAt', 'title'),
    sortOrder: Joi.string().valid('asc', 'desc'),
    type: Joi.string().valid(['posts', 'comments']),
    userPost: Joi.boolean().default(false),
    searchQuery: Joi.string(),
  });

  return validateRequest(req, res, next, schema, requestParameterTypes.query);
};

module.exports = { createPost, addComment, findPosts };
