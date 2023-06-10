const renderPage = async (req, res) => {
    const { token } = req.params;
    return res.render('reset-password');
}

module.exports = {
    renderPage,
}