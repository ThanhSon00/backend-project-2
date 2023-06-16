const { otherTokenAttr } = require("../setting/attributes");

const renderPage = async (req, res) => {
    const { message, notification } = req.cookies;
    res.clearCookie('message', otherTokenAttr);
    res.clearCookie('notification', otherTokenAttr);
    return res.render('login', { message, notification });
}

module.exports = {
    renderPage,
}