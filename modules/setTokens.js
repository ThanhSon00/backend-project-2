const { accessTokenAttr, refreshTokenAttr, rememberTokenAttr } = require('../setting/attributes')

const setTokens = (res, tokens) => {
    const { accessToken, refreshToken, rememberToken } = tokens;
    if (accessToken) res.cookie('access_token', accessToken, accessTokenAttr);
    if (refreshToken) res.cookie('refresh_token', refreshToken, refreshTokenAttr);
    if (rememberToken) res.cookie('remember_token', rememberToken, rememberTokenAttr);
}

module.exports = setTokens;