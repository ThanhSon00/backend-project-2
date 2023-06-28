const mongoose = require('../../database/connect');

const notificationSchema = new mongoose.Schema({
    description: String,
    timestamp: {
        type: Date, 
        default: Date.now 
      }
});

const Notification = mongoose.model('notification', notificationSchema);

module.exports = Notification;