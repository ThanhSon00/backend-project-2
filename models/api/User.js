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

securityInfoSchema.pre('save', async function (next) {
  const securityInfo = this;
  if (securityInfo.isModified('validator')) updateValidator();
  if (securityInfo.isModified('password')) await updatePassword();
  return next();

  function updateValidator() {
    if (!securityInfo.validator) return;
    const validator = securityInfo.validator.toString();
    const hash = crypto.createHmac('sha256', process.env.SHA256_SECRET)
      .update(validator)
      .digest('hex');
    securityInfo.validator = hash;
  }

  async function updatePassword() {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(securityInfo.password, salt);
    securityInfo.password = hash;
  }
})

const User = mongoose.model('user', userSchema);
module.exports = {
  User,
}