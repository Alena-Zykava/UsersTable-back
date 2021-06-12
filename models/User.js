const { Schema, model } = require('mongoose');

const User = new Schema({
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    dataRegistration: { type: String, required: true },
    lastLoginData: { type: String, required: true },
    status: { type: Boolean, required: true }
});

module.exports = model('User', User);
