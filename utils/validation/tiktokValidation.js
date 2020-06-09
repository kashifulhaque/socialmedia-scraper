const Joi = require("@hapi/joi");

// Schema
const schema = Joi.object({
  username: Joi.string().alphanum().required(),
});

module.exports.tiktokUsername = (username) => {
  const data = schema.validate({
    username: username,
  });

  return data;
};
