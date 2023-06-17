const { accessTokenAttr, refreshTokenAttr, rememberTokenAttr } = require('../setting/attributes')

const clearAllTokens = (res) => {
    res.clearCookie('access_token', accessTokenAttr);
    res.clearCookie('refresh_token', refreshTokenAttr);
    res.clearCookie('remember_token', rememberTokenAttr);
}

module.exports = clearAllTokens;