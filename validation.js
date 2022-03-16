// Validation
const Joi = require('@hapi/joi');

// Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required()
    });

    return schema.validate(data);
};

// Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required()
    });

    return schema.validate(data);
};

const createNoteValidation = (data) => {
    const schema = Joi.object({
        owner: Joi.string().required(),
        name: Joi.string().required(),
        content: Joi.string()
    })

    return schema.validate(data)
}

module.exports = {
    registerValidation,
    loginValidation,
    createNoteValidation
};