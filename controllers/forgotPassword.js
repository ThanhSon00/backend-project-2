const { otherTokenAttr } = require("../setting/attributes");
const nodemailer = require('nodemailer');
const { originURL, makeRequest } = require('../setting/api')
const { v4: uuidv4 } = require('uuid');
const ejs = require('ejs');
const { StatusCodes } = require("http-status-codes");

const renderPage = async (req, res) => {
    const { message } = req.cookies;
    res.clearCookie('message', otherTokenAttr);
    return res.render('forgot-password', { message });
}

const sendMailResetPwd = async (req, res) => {
    const { email: recipient, _id: userID } = req.body;
    const currentDate = new Date();
    const token = `${uuidv4()}-${currentDate.getTime()}`
    const tokenURL = `${originURL}/reset-password/${token}`;
    const resetPwdForm = await renderFileAsync("./views/request-reset-password.ejs", { tokenURL })
    await sendMail(recipient, resetPwdForm);
    await makeRequest(`/api/v1/users/${userID}`, 'PATCH', { lockToken: token });
    const message = `Password Reset Mail has been sent to ${recipient}. Please check your email.`;
    return res.status(StatusCodes.OK).send(message);
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
            user: process.env.APP_USER,
            pass: process.env.APP_PASSWORD
        }
    })
    const mailOptions = {
        from: process.env.APP_USER,
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
