const { accessTokenAttr, refreshTokenAttr, rememberTokenAttr, otherTokenAttr } = require('../setting/attributes')
const { makeRequest, originURL } = require('../setting/api')
const { StatusCodes } = require('http-status-codes');

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
                err.response?.status === StatusCodes.BAD_REQUEST) {
                res.cookie('message', err.response.data, otherTokenAttr);
            }
            return res.redirect(`${originURL}/login`);
        }
        setCookies(res, tokens);
        return res.redirect(`${originURL}/home`);
    })
}

const refreshSession = async (req, res) => {
    const redirect = req.cookies.redirect || 'back';
    const rememberToken = req.cookies.remember_token;
    const refreshToken = req.cookies.refresh_token;
    const body = { rememberToken, refreshToken };
    makeRequest('/api/v1/sessions', 'PATCH', body, async (err, tokens) => {
        if (err) {
            clearAllTokens(res);
            return res.redirect('back');
        }
        setCookies(res, tokens);
        if (redirect === 'back') return res.redirect('back');
        return res.redirect(`${origin}${redirect}`);
    });
}

const setCookies = (res, tokens) => {
    const { accessToken, refreshToken, rememberToken } = tokens;
    if (accessToken) res.cookie('access_token', accessToken, accessTokenAttr);
    if (refreshToken) res.cookie('refresh_token', refreshToken, refreshTokenAttr);
    if (rememberToken) res.cookie('remember_token', rememberToken, rememberTokenAttr);
}

const revokeSession = async (req, res) => {
    const accessToken = req.cookies.access_token;
    await makeRequest(`/api/v1/sessions/${accessToken}`, 'DELETE');
    clearAllTokens(res);
    return res.redirect(`${originURL}/login`);
}

const clearAllTokens = (res) => {
    res.clearCookie('access_token', accessTokenAttr);
    res.clearCookie('refresh_token', refreshTokenAttr);
    res.clearCookie('remember_token', rememberTokenAttr);
}

module.exports = {
    loginHandler,
    revokeSession,
    refreshSession,
}