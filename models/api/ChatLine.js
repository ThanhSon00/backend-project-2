const mongoose = require('../../database/connect');

const chatLineSchema = new mongoose.Schema({
    content: String,
    timestamp: {
        type: String, 
    },
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    conversationID: {
        type: mongoose.Types.ObjectId,
        ref: 'conversation',
    }
});

const ChatLine = mongoose.model('chatLine', chatLineSchema);

chatLineSchema.remove('conversationID');

module.exports = {
    ChatLine,
    chatLineSchema
};