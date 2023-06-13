const { StatusCodes } = require("http-status-codes");
const { otherTokenAttr } = require("../setting/attributes");

const renderPage = async (req, res) => {
    const { token } = req.params;
    const { message } = req.cookies;
    const { user } = req.body;
    const body = { message, userID: user._id, token };
    res.clearCookie('message', otherTokenAttr);
    return res.render('reset-password', body);
}

module.exports = {
    renderPage,
}