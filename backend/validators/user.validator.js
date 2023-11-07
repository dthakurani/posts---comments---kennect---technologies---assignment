const Joi = require('joi');
const { validateRequest } = require('../utilities/commonFunctions');

const requestParameterTypes = {
  body: 'body',
  query: 'query',
  params: 'param',
};

// Remove quotes from variable names in error messages
const JoiInstance = Joi.defaults((schema) =>
  schema.options({
    errors: {
      wrap: {
        label: false,
      },
    },
  }),
);

// validate user register request body
const registerUser = function (req, res, next) {
  const schema = JoiInstance.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/)
      .message(
        'Password must meet the following criteria: at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.',
      ),
  });

  return validateRequest(req, res, next, schema, requestParameterTypes.body);
};

// validate user login body
const loginUser = function (req, res, next) {
  const schema = JoiInstance.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return validateRequest(req, res, next, schema, requestParameterTypes.body);
};

module.exports = { registerUser, loginUser };
