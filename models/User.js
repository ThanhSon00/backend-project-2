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
    notifications: Array,
    token: String,
    selector: Number,
    validator: String,
    isGoogleUser: Boolean
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

userSchema.pre('findOneAndUpdate', async function (next) {
  const user = this;
  if (!user._update.validator) return next();
  const secret = process.env.SHA256_SECRET;
  const message = user._update.validator.toString();
  const hash = crypto.createHmac('sha256', secret)
                     .update(message)
                     .digest('hex');
  user._update.validator = hash
  next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;