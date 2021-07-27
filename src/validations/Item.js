const Joi = require("joi");

const itemValidation = (item) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    description: Joi.string().min(2).max(255).required(),
    category: Joi.string().min(2).max(255).required(),
    price: Joi.number().required(),
    noInStock: Joi.number().required(),
    URL: Joi.string().min(2).max(255).required(),
  }).unknown();

  return schema.validate(item);
};

module.exports = itemValidation;
