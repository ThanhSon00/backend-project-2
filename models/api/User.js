const mongoose = require('../../database/connect');
const bcrypt = require('bcryptjs')
const crypto = require('crypto');
const { smallConversationSchema, normalUserInfoSchema } = require('./Conversation');

const uniqueNormalInfoSchema = normalUserInfoSchema;

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
  normalInfo: normalUserInfoSchema
}, { _id: false })

const onlineStatusSchema = new mongoose.Schema({
  lastOnlineAt: Date,
  isOnline: Boolean,
})

const userSchema = new mongoose.Schema({
  normalInfo: uniqueNormalInfoSchema,
  securityInfo: securityInfoSchema,
  socialConnectInfo: socialConnectInfoSchema,
  conversations: [smallConversationSchema], 
  friends: [friendSchema],
  onlineStatus: onlineStatusSchema
})

// Hooks
userSchema.pre('save', async function (next) {
  const user = this;
  const createOrUpdateSession = () => {
    user.onlineStatus.isOnline = true;
    user.onlineStatus.lastOnlineAt = null;
  }
  const deleteSession = () => {
    user.onlineStatus.isOnline = false;
    user.onlineStatus.lastOnlineAt = new Date();  
  }

  if (user.directModifiedPaths().toString() === ['securityInfo.token', 'securityInfo.validator'].toString() 
   && user.directModifiedPaths().toString() === ['securityInfo.validator', 'securityInfo.token'].toString()) {
    if (user.securityInfo.token && securityInfo.validator) {
      createOrUpdateSession();
    } else if (!user.securityInfo.token && !securityInfo.validator) {
      deleteSession();
    }
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