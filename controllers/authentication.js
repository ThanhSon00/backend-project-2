const nodemailer = require('nodemailer');
const { accessTokenAttr, refreshTokenAttr, rememberTokenAttr } = require('../setting/attributes')
const { makeRequest } = require('../setting/api')
const originURL = `${process.env.PROTOCOL}://${process.env.DOMAIN}:${process.env.PORT}`;
const { v4: uuidv4 } = require('uuid');
const ejs = require('ejs');

const login = async (req, res) => {
    const { email, password, remember: rememberMe, credential } = req.body;
    // Create and save session details to database
    const tokens = await makeRequest(`/api/v1/sessions`, 'POST', {
        email,
        password,
        rememberMe,
        credential,
    })
    if (!tokens) {
        return res.redirect(`${originURL}/login`);
    }
    await setCookies(res, tokens);
    return res.redirect(`${originURL}/home`);
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
        await setCookies(res, tokens);
        if (redirect === 'back') return res.redirect('back');
        return res.redirect(`${origin}${redirect}`);
    });
}

const setCookies = async (res, tokens) => {
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

const sendMailResetPwd = async (req, res) => {
    const { email: recipient, _id: userID } = req.body;
    const token = uuidv4();
    const urlToken = `${originURL}/reset-password/${token}`;
    const resetPwdForm = await renderFileAsync("./views/request-reset-password.ejs", { urlToken })
    await sendMail(recipient, resetPwdForm);
    await makeRequest(`/api/v1/users/${userID}`, 'PATCH', { lockToken: token });
    return res.redirect(`${originURL}/notification`);
}

const renderFileAsync = async (filePath, data) => {
    return new Promise((resolve, reject) => {
        ejs.renderFile(filePath, data, (error, renderedHtml) => {
            if (error) {
                reject(error);
            } else {
                resolve(renderedHtml);
            }
        });
    });
}

const sendMail = async (recipient, htmlData) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'phanson999999@gmail.com',
            pass: process.env.APP_PASSWORD
        }
    })
    const mailOptions = {
        from: 'phanson999999@gmail.com',
        to: recipient,
        subject: "Chat Application: Reset Password",
        html: htmlData
    }
    await transporter.sendMail(mailOptions);
}

module.exports = {
    login,
    revokeSession,
    refreshSession,
    sendMailResetPwd,
}