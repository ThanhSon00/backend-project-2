const { StatusCodes } = require("http-status-codes");
const { otherTokenAttr } = require("../setting/attributes");
const { makeRequest } = require("../setting/api");

const renderPage = async (req, res) => {
    const { token } = req.params;
    const { message } = req.cookies;
    const { user } = req.body;
    const body = { message, userID: user._id, token };
    res.clearCookie('message', otherTokenAttr);
    return res.render('reset-password', body);
}

const resetPassword = async (req, res) => {
    const { newPassword, userID } = req.body;
    const body = { 
        password: newPassword,
        lockToken: null, 
    };
    await makeRequest(`/api/v1/users/${userID}`, 'PATCH', body);
    return res.status(StatusCodes.OK).send("You have changed password");
}

module.exports = {
    renderPage,
    resetPassword,
}