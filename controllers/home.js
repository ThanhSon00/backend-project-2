const { originURL } = require("../setting/api");

const renderPage = async (req, res) => {
    const { user } = req.body;
    return res.render('home', { 
        user,
        originURL
    });
}

module.exports = {
    renderPage
}