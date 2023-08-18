const mongoose = require('../../database/connect');
const { chatLineSchema } = require('./ChatLine');


const normalUserInfoSchema = new mongoose.Schema({
    name: String,
    title: String,
    avatar: String,
    email: { type: String, sparse: true }
}, { _id: false })  

const memberSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    normalInfo: normalUserInfoSchema,
    hasLeft: Boolean,
}, { _id: false });

const smallMemberSchema = memberSchema.clone();
smallMemberSchema.remove(['normalInfo', 'hasLeft']);

const normalInfoSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    isGroup: Boolean,
}, { _id: false })

const smallConversationSchema = mongoose.Schema({
    normalInfo: normalInfoSchema,
    members: [smallMemberSchema],
    _id: { 
        type: mongoose.Types.ObjectId, 
        ref: 'conversation'
    },
    lastSeenChatLine: {
        type: mongoose.Types.ObjectId, 
        ref: 'chatline'    
    }
}, { _id: false })

const conversationSchema = new mongoose.Schema({
    normalInfo: normalInfoSchema,
    members: [memberSchema],
    chatLines: [chatLineSchema],
    description: String,
});

conversationSchema.pre('save', function (next) {
    const conversation = this;
    if (!conversation.normalInfo) {
        conversation.normalInfo = {};
    }
    if (conversation.members.length === 2) {
        conversation.normalInfo.isGroup = false;
    } else if (conversation.members.length > 2) {
        conversation.normalInfo.isGroup = true;
    } else throw new Error("Must be 2 members or above");
    return next();
})

const Conversation = mongoose.model('conversation', conversationSchema);

module.exports = {
    Conversation,
    smallConversationSchema,
    normalUserInfoSchema,
};
