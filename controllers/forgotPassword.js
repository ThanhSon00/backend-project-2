const { otherTokenAttr } = require("../setting/attributes");

const renderPage = async (req, res) => {
    const { message } = req.cookies;
    res.clearCookie('message', otherTokenAttr);
    return res.render('forgot-password', { message });
}

module.exports = {
    renderPage,
}