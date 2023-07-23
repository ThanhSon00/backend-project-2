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



module.exports = {
    getUsers,
    createUser,
    getUser,
    updateUser,
}