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
    const loginData = {
        email: req.body.email,
        password: req.body.password,
        rememberMe: req.body.rememberMe,
        credential: req.body.credential,
        name: req.body.name,
        selector: req.body.selector,
    } 
    // Create and save session details to database
    makeRequest(`/api/v1/sessions`, 'POST', loginData, (err, tokens) => {
        if (err) {
            const message = err.response?.data || "";
            const errorStatus = err.response?.status || StatusCodes.INTERNAL_SERVER_ERROR;
            return res.status(errorStatus).send(message);
        }
        setTokens(res, tokens);
        if (userLoginByGoogle()) return res.redirect(`${originURL}/home`);
        return res.status(StatusCodes.OK).send();
    })
    
    const userLoginByGoogle = () => {
        if (loginData.credential) {
            return true;
        }
        return false;
    }      
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