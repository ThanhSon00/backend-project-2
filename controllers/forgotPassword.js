const { otherTokenAttr } = require("../setting/attributes");
const nodemailer = require('nodemailer');
const { originURL, makeRequest } = require('../setting/api')
const { v4: uuidv4 } = require('uuid');
const ejs = require('ejs');

const renderPage = async (req, res) => {
    const { message } = req.cookies;
    res.clearCookie('message', otherTokenAttr);
    return res.render('forgot-password', { message });
}

const sendMailResetPwd = async (req, res) => {
    const { email: recipient, _id: userID } = req.body;
    const currentDate = new Date();
    const token = `${uuidv4()}-${currentDate.getTime()}`
    const urlToken = `${originURL}/reset-password/${token}`;
    const resetPwdForm = await renderFileAsync("./views/request-reset-password.ejs", { urlToken })
    await sendMail(recipient, resetPwdForm);
    await makeRequest(`/api/v1/users/${userID}`, 'PATCH', { lockToken: token });
    res.cookie('notification', 'Password Reset Link has been sent to your email.', otherTokenAttr);
    return res.redirect(`${originURL}/login`);
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
    renderPage,
    sendMailResetPwd,
}
