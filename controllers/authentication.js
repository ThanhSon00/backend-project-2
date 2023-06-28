const { originURL } = require('../setting/api')
const setTokens = require('../modules/setTokens');
const clearAllTokens = require('../modules/clearAllTokens');
const SessionService = require('../services/Session');

const refreshSession = async (req, res) => {
    const redirect = req.cookies.redirect || 'back';
    const rememberToken = req.cookies.remember_token;
    const refreshToken = req.cookies.refresh_token;    
    const newTokens = await SessionService.refreshSession(rememberToken, refreshToken);
    if (!newTokens) {
        clearAllTokens(res);
        return res.redirect('back');
    }
    setTokens(res, newTokens);
    if (redirect === 'back') return res.redirect('back');
    return res.redirect(`${originURL}${redirect}`);
}

const revokeSession = async (req, res) => {
    const accessToken = req.cookies.access_token;
    await SessionService.revokeSession(accessToken);
    clearAllTokens(res);
    return res.redirect(`${originURL}/login`);
}

module.exports = {
    revokeSession,
    refreshSession,
}