const mongoose = require('mongoose'),
    Joi = require('joi');

const userJoiSchema = Joi.object({
    username: Joi.string()
    .alphanum()
    .min(2)
    .max(30),
    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
})

const passwordJoiSchema = Joi.object({
    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
})

const User = mongoose.model('User', {
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = {
    User,
    userJoiSchema,
    passwordJoiSchema
};