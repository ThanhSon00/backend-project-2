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

const smallConversationSchema = mongoose.Schema({
    name: String,
    _id: { 
        type: mongoose.Types.ObjectId, 
        ref: 'conversation'
    }
}, { _id: false })

const conversationSchema = new mongoose.Schema({
    name: String,
    description: String,
    isGroup: Boolean,
    members: [memberSchema],
    chatLines: [chatLineSchema]
});

conversationSchema.pre('save', async function (next) {
    const conversation = this;
    if (conversation.members.length === 2) {
        conversation.isGroup = false;
    } else if (conversation.members.length > 2) {
        conversation.isGroup = true;
    } else throw new Error("Must be 2 members or above");
    return next();
})

const Conversation = mongoose.model('conversation', conversationSchema);

module.exports = {
    Conversation,
    smallConversationSchema,
    normalUserInfoSchema,
};
