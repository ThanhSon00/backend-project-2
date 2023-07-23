const { StatusCodes } = require("http-status-codes");
const UserModel = require('../models/User');

const renderPage = async (req, res) => {
    const { token } = req.params;
    const { user } = req.body;
    const body = { userID: user._id, token };
    return res.render('reset-password', body);
}

const resetPassword = async (req, res) => {
    const { newPassword, userID } = req.body;
    const userDataToUpdate = { 
        'securityInfo.password': newPassword,
        'securityInfo.lockToken': null, 
    };
    await UserModel.updateUser(userID, userDataToUpdate);
    return res.status(StatusCodes.OK).send('You have changed password successfully');
}

module.exports = {
    renderPage,
    resetPassword,
}