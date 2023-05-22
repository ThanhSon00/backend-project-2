const ChatLine = require('../models/ChatLine');
const Conversation = require('../models/Conversation');
const Notification = require('../models/Notification');
const User = require('../models/User');

(async () => {
    const user1 = new User({
        groups: [],
        notifications: [],
        name: "Phan Hoàng Thanh Sơn",
        avatar: "https://domain/avatar",
        password: "encrypted password",
        phoneNumber: "094 366 7980",
        title: "son"
    });
    await user1.save();

    const users = await User.find();
    const userID = users[0]._id;
    const chatLine1 = new ChatLine({
        description: "First Comment",
        userID: userID
    })
})()
