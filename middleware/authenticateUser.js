const { originURL } = require('../setting/api');
const SessionService = require('../services/Session');

const authenticateUser = async (req, res, next) => {
    const accessToken = req.cookies.access_token;
    if (!accessToken) return res.redirect(`${originURL}/login`);

    const user = await SessionService.validateSession(accessToken);
    if (!user) return res.redirect(`${originURL}/authentication/refresh`);
    req.body.user = user;
    return next();
}

module.exports = authenticateUser;