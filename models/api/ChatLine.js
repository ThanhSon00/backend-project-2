const mongoose = require('../../database/connect');

const chatLineSchema = new mongoose.Schema({
    description: String,
    timestamp: {
        type: Date, 
        default: Date.now 
    },
    userID: mongoose.Types.ObjectId
});

const ChatLine = mongoose.model('chatLine', chatLineSchema);

module.exports = ChatLine;