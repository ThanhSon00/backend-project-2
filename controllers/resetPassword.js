const { StatusCodes } = require("http-status-codes");
const { makeRequest } = require('../setting/api');

const renderPage = async (req, res) => {
    const { token } = req.params;
    const { user } = req.body;
    const body = { userID: user._id, token };
    return res.render('reset-password', body);
}

const resetPassword = async (req, res) => {
    const { newPassword, userID } = req.body;
    const body = { 
        password: newPassword,
        lockToken: null, 
    };
    await makeRequest(`/api/v1/users/${userID}`, 'PATCH', body);
    return res.status(StatusCodes.OK).send('You have changed password successfully');
}

module.exports = {
    renderPage,
    resetPassword,
}