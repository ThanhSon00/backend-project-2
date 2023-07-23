const { accessTokenAttr, refreshTokenAttr, rememberTokenAttr } = require('../setting/attributes')
const { originURL } = require('../setting/api')
const { StatusCodes } = require('http-status-codes');
const AuthService = require('../services/Authentication');
const SessionService = require('../services/Session');

const renderPage = async (req, res) => {
    return res.render('login');
}

const doLogin = async (req, res) => {
    const { rememberMe } = req.body;
    const user = await AuthService.doLogin(req);
    if (!user) return res.status(StatusCodes.BAD_REQUEST).send();
    const tokens = await SessionService.createSession(user, rememberMe);

    setCookies(res, tokens);
    if (user.socialConnectInfo.isGoogleUser) return res.redirect(`${originURL}/home`);
    return res.status(StatusCodes.OK).send();
}

const setCookies = (res, tokens) => {
    const { accessToken, refreshToken, rememberToken } = tokens;
    if (accessToken) res.cookie('access_token', accessToken, accessTokenAttr);
    if (refreshToken) res.cookie('refresh_token', refreshToken, refreshTokenAttr);
    if (rememberToken) res.cookie('remember_token', rememberToken, rememberTokenAttr);
}

module.exports = {
    renderPage,
    doLogin,
}