const { Schema, model } = require('mongoose');

const User = new Schema({
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, required: false },
    dataRegistration: { type: String, required: false },
    lastLoginData: { type: String, required: false },
    status: { type: Boolean, required: false },
    roles: [{ type: String, ref: 'Role' }]
});

module.exports = model('User', User);
