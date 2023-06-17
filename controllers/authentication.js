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
const setTokens = require('../modules/setTokens');
const clearAllTokens = require('../modules/clearAllTokens');

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
        setTokens(res, tokens);
        if (redirect === 'back') return res.redirect('back');
        return res.redirect(`${originURL}${redirect}`);
    });
}

const revokeSession = async (req, res) => {
    const accessToken = req.cookies.access_token;
    await makeRequest(`/api/v1/sessions/${accessToken}`, 'DELETE');
    clearAllTokens(res);
    return res.redirect(`${originURL}/login`);
}

module.exports = {
    revokeSession,
    refreshSession,
}