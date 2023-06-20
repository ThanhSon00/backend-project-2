const User = require('../models/User');
const { StatusCodes } = require('http-status-codes')
const crypto = require('crypto');
const validator = require('validator');
const defaultFields = 'email password name avatar title token selector validator isGoogleUser lockToken isFacebookUser';

const getUsers = async (req, res) => {
    const filters = req.query;
    let { fields } = req.query;
    if (!fields) {
        fields = defaultFields
    } else {
        fields = fields.replace(',', ' ').trim();
    }
    const users = await User.find(filters   , fields);
    if (!users[0]) {
        return res.status(StatusCodes.NOT_FOUND).send("User not found");
    }
    return res.status(StatusCodes.OK).json(users[0]);
}

const createUser = async (req, res) => {
    const { name, email } = req.body;
    const isFacebookUser = req.body.isFacebookUser || false;
    const isGoogleUser = req.body.isGoogleUser || false;
    const password = req.body.password || crypto.randomBytes(20).toString('hex');
    const avatar = req.body.avatar || "";
    const selector = req.body.selector?.toString() || "";
    // if (!name || !email) {
    //     return res.status(StatusCodes.BAD_REQUEST).send("Not enough information");
    // }
    // if (!validator.default.isEmail(email)) {
    //     return res.status(StatusCodes.BAD_REQUEST).send("Email is not correct");
    // } 
    
    const userData = {
        groups: [],
        notifications: [],
        name,
        avatar,
        password,
        email,
        isGoogleUser,
        isFacebookUser,
        title: "",
        token: "",
        selector,
        validator: "",
        lockToken: "",
    };

     // Avoid violating unique constraint when email is null in db
    if (!userData.email) delete userData.email;
    const user = await User.create(userData);

    return res.status(StatusCodes.CREATED).json(user);
}

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id, 'token');
    return res.status(StatusCodes.OK).json(user);
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const updateUser = req.body;
    const options = { new: true }
    const user = await User.findByIdAndUpdate(id, updateUser, options);
    return res.status(StatusCodes.OK).json(user);
}

module.exports = {
    getUsers,
    createUser,
    getUser,
    updateUser,
}