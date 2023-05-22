const mongoose = require('../database/connect');

const conversationSchema = new mongoose.Schema({
    name: String,
    memberAmount: Number,
    members: Array,
    chatLines: Array
});

const Conversation = mongoose.model('conversation', conversationSchema);

module.exports = Conversation;