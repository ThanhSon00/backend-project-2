const { makeRequest, originURL } = require('../setting/api');

const authenticateUser = async (req, res, next) => {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
        return res.redirect(`${originURL}/login`);
    }
    makeRequest(`/api/v1/sessions/${accessToken}`, 'GET', null, (err, user) => {
        if (err) {
            // If access token is not valid, server will refresh token.
            return res.redirect(`${originURL}/authentication/refresh`);
        }
        req.body.user = user;
        return next();
    })
}

module.exports = authenticateUser;