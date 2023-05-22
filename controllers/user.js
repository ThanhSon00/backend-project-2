const User = require('../models/User');
const { StatusCodes } = require('http-status-codes')
const getUsers = async (req, res) => {
    const phoneNumber = req.query.phoneNumber;
    const users = await User.find({phoneNumber});
    if (!users[0]) {
        return res.status(StatusCodes.NOT_FOUND).send();
    }
    return res.status(StatusCodes.OK).json(users[0]);
}

module.exports = {
    getUsers,
}