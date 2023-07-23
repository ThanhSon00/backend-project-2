const { User } = require('../../models/api/User');
const { StatusCodes } = require('http-status-codes')
const crypto = require('crypto');
const { Conversation: ConversationModel, Conversation } = require('../../models/api/Conversation');

const getUsers = async (req, res) => {
    const filters = req.query;
    const users = await User.find(filters);
    if (users.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).send("User not found");
    }
    return res.status(StatusCodes.OK).json(users);
}

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    return res.status(StatusCodes.OK).json(user);
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const updateUser = req.body;
    const options = { new: true }
    const user = await User.findByIdAndUpdate(id, updateUser, options);
    return res.status(StatusCodes.OK).json(user);
}

const getUserConversations = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id, 'conversations');
    
    const userConversations = user.conversations;
    return res.status(StatusCodes.OK).json(userConversations);
}

const createUser = async (req, res) => {
    const { name, email, _id } = req.body;
    const isFacebookUser = req.body.isFacebookUser || false;
    const isGoogleUser = req.body.isGoogleUser || false;
    const password = req.body.password || crypto.randomBytes(20).toString('hex');
    const avatar = req.body.avatar || "";
    const selector = req.body.selector?.toString() || "";
    
    let title, token, validator, lockToken;
    title = token = validator = lockToken = "";

    const normalInfo = { name, avatar, title, email };
    const securityInfo = { password, token, selector, validator, lockToken };
    const socialConnectInfo = { isGoogleUser, isFacebookUser };
    const conversations = [];
    const friends = []; 
    const userData = { _id, normalInfo, securityInfo, socialConnectInfo, conversations, friends };
    
     // Avoid violating unique constraint when email is null in db
    if (!userData.normalInfo.email) delete userData.normalInfo.email;
    const user = await User.create(userData);

    return res.status(StatusCodes.CREATED).json(user);
}

const createUserFriend = async (req, res) => {
    const objectIdToString = (id) => { return JSON.stringify(id).replaceAll(`"`, ``) };
    const { id } = req.params;
    const { _id, normalInfo } = req.body;
    const userFriend = { _id, normalInfo };
    const newFriendID = userFriend._id;

    const friend = await User.findById(userFriend._id);
    const user = await User.findById(id);
    
    const userAddFriendHimself = objectIdToString(user._id) == newFriendID;
    const userHadAddedThatFriendBefore = user.friends.find(friend => objectIdToString(friend._id) == newFriendID);
    const members = [ userFriend, user ];

    if (userAddFriendHimself) {
        return res.status(StatusCodes.CONFLICT).send('Cannot add yourself as friend');
    }
    if (userHadAddedThatFriendBefore) {
        return res.status(StatusCodes.CONFLICT).send('That user already your friend');
    }
    
    const conversation = await ConversationModel.create({ members });
    
    conversation.name = userFriend.normalInfo.title;
    user.friends.push(userFriend);
    user.conversations.push(conversation);

    conversation.name = user.normalInfo.title;
    friend.friends.push(user);
    friend.conversations.push(conversation);

    await friend.save();
    await user.save();
    return res.status(StatusCodes.CREATED).json(userFriend);
}

const getUserFriends = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const userFriend = user.friends;
    return res.status(StatusCodes.OK).json(userFriend);
}


const deleteUserFriend = async (req, res) => {
    const { id, friendID } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendID);

    user.friends.pull(friendID);
    friend.friends.pull(user._id);

    await friend.save();
    await user.save();

    return res.status(StatusCodes.OK).send();
}

const deleteUserConversation = async (req, res) => {
    const { id, conversationID } = req.params;
    const user = await User.findById(id);
    const conversation = await Conversation.findById(conversationID);
    const member = conversation.members.id(id);
    
    if (!conversation.isGroup) {
        return res.status(StatusCodes.BAD_REQUEST).send("Can not delete this conversation");
    }

    member.hasLeft = true;
    user.conversations.pull(conversationID);

    await conversation.save();
    await user.save();

    return res.status(StatusCodes.OK).send();    
}
module.exports = {
    getUsers,
    createUser,
    createUserFriend,
    getUser,
    updateUser,
    getUserConversations,
    getUserFriends,
    deleteUserFriend,
    deleteUserConversation,
}