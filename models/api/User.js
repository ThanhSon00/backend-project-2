const mongoose = require('../../database/connect');
const bcrypt = require('bcryptjs')
const crypto = require('crypto');
const { smallConversationSchema, normalInfoSchema } = require('./Conversation');

const uniqueNormalInfoSchema = normalInfoSchema.omit(['email']);
uniqueNormalInfoSchema.add({ email: { type: String, unique: true, sparse: true } });

const securityInfoSchema = new mongoose.Schema({
  password: String,
  token: String,
  selector: String,
  validator: String,
  lockToken: String,
}, { _id: false });

const socialConnectInfoSchema = new mongoose.Schema({
  isGoogleUser: Boolean,
  isFacebookUser: Boolean,
}, { _id: false });

const friendSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    ref: "user"
  },
  normalInfo: normalInfoSchema
}, { _id: false })

const userSchema = new mongoose.Schema({
  normalInfo: uniqueNormalInfoSchema,
  securityInfo: securityInfoSchema,
  socialConnectInfo: socialConnectInfoSchema,
  conversations: [smallConversationSchema], 
  friends: [friendSchema], 
});


// Hooks
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.socialConnectInfo.isModified('securityInfo.password')) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.securityInfo.password, salt);
  user.securityInfo.password = hash;
  if (!user.securityInfo.selector) {
    user.securityInfo.selector = Math.floor(Math.random() * 9000000000) + 1000000000;
  }
  return next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
  const user = this;
  if (user._update['securityInfo.validator']) {
    const secret = process.env.SHA256_SECRET;
    const message = user._update['securityInfo.validator'].toString();
    const hash = crypto.createHmac('sha256', secret)
      .update(message)
      .digest('hex');
    user._update['securityInfo.validator'] = hash
  } else if (user._update['securityInfo.password']) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user._update['securityInfo.password'], salt);
    user._update['securityInfo.password'] = hash;
  }
  return next();
});

const User = mongoose.model('user', userSchema);
module.exports = {
  User,
}