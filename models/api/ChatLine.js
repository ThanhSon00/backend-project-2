const mongoose = require('../../database/connect');

const chatLineSchema = new mongoose.Schema({
    content: String,
    timestamp: Date,
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    conversationID: {
        type: mongoose.Types.ObjectId,
        ref: 'conversation',
    }
});

chatLineSchema.pre("save", function (next) {
    const chatLine = this;
    chatLine.timestamp ||= new Date();
    return next();
})

const ChatLine = mongoose.model('chatLine', chatLineSchema);
module.exports = {
    ChatLine,
    chatLineSchema
};