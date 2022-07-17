const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 255 
    }
}));

const validateUser = user => {
    const schema = {
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(8).max(255).required()
    };

    return Joi.validate(user, schema);
};

exports.User = User;
exports.validate = validateUser;

