const mongoose = require('../database/connect');
const bcrypt = require('bcryptjs')
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    title: String,
    password: String,
    email: { type: String, unique: true },
    groups: Array,
    notifications: Array
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  user.selector = Math.floor(Math.random() * 9000000000) + 1000000000;
  next();
});


const User = mongoose.model('user', userSchema);

module.exports = User;