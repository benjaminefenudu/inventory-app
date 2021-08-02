const Joi = require("joi");

// =-=-=-=-=-= Sign-Up Validation =-=-=-=-=-=
const signUpValidation = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(255).required(),
    lastName: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).required().email(),
    businessName: Joi.string().min(2).max(255).required(),
    password: Joi.string().min(8).max(255).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
  }).unknown();

  return schema.validate(user);
};

// =-=-=-=-=-= Sign-In Validation =-=-=-=-=-=
const signInValidation = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  }).unknown();

  return schema.validate(user);
};

// =-=-=-=-=-= Password Change Validation =-=-=-=-=-=
const passwordChangeValidation = (item) => {
  const schema = Joi.object({
    oldPassword: Joi.string().min(6).max(255).required(),
    newPassword: Joi.string().min(6).max(255).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref("newPassword")),
  }).unknown();

  return schema.validate(item);
};

module.exports = {
  signUpValidation,
  signInValidation,
  passwordChangeValidation,
};
