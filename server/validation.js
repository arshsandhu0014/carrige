const Joi = require("@hapi/joi");

const registrationValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;
