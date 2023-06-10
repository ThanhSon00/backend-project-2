const checkLogged = async (req, res, next) => {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
        return next();
    }
    return res.redirect('/home');
}

module.exports = checkLogged;