const { accessTokenAttr, refreshTokenAttr, rememberTokenAttr, otherTokenAttr } = require('../setting/attributes')
const { makeRequest, originURL } = require('../setting/api')
const { StatusCodes } = require('http-status-codes');

const renderPage = async (req, res) => {
    const { message, notification } = req.cookies;
    res.clearCookie('message', otherTokenAttr);
    res.clearCookie('notification', otherTokenAttr);
    return res.render('login', { message, notification });
}

const loginHandler = async (req, res) => {
    const { email, password, remember: rememberMe, credential } = req.body;
    // Create and save session details to database
    makeRequest(`/api/v1/sessions`, 'POST', {
        email,
        password,
        rememberMe,
        credential,
    }, (err, tokens) => {
        if (err) {
            if (err.response?.status === StatusCodes.UNAUTHORIZED || 
                err.response?.status === StatusCodes.BAD_REQUEST ||
                err.response?.status === StatusCodes.NOT_ACCEPTABLE) {
                res.cookie('message', err.response.data, otherTokenAttr);
            }
            return res.redirect(`${originURL}/login`);
        }
        setTokens(res, tokens);
        return res.redirect(`${originURL}/home`);
    })
}

const setTokens = (res, tokens) => {
    const { accessToken, refreshToken, rememberToken } = tokens;
    if (accessToken) res.cookie('access_token', accessToken, accessTokenAttr);
    if (refreshToken) res.cookie('refresh_token', refreshToken, refreshTokenAttr);
    if (rememberToken) res.cookie('remember_token', rememberToken, rememberTokenAttr);
}

module.exports = {
    renderPage,
    loginHandler,
}