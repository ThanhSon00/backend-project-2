const mongoose = require('../database/connect');

const userSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    title: String,
    password: String,
    phoneNumber: String,
    groups: Array,
    notifications: Array
});

const User = mongoose.model('user', userSchema);

module.exports = User;