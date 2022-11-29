const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string()
        .min(8)
        .max(15)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{8,15}$')),
});

module.exports = schema;