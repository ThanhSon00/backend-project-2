const nodemailer = require('nodemailer');
const { originURL } = require('../setting/api')
const { v4: uuidv4 } = require('uuid');
const { StatusCodes } = require("http-status-codes");
const FormService = require('../services/form');
const UserModel = require('../models/User');

const renderPage = async (req, res) => {
    return res.render('forgot-password');
}

const sendMailResetPwd = async (req, res) => {
    const { email: recipient, _id: userID, user } = req.body;
    if (user.isGoogleUser) return res.status(StatusCodes.NOT_ACCEPTABLE).send();
    const tokenURL = generateTokenURL();
    const resetPwdForm = await FormService.createForm(tokenURL.url);
    await UserModel.updateUser(userID, { lockToken: tokenURL.token });
    await sendMail(recipient, resetPwdForm);
    const message = `Password Reset Mail has been sent to ${recipient}. Please check your email.`;
    return res.status(StatusCodes.OK).send(message);
}

const generateTokenURL = () => {
    const currentDate = new Date();
    const token = `${uuidv4()}-${currentDate.getTime()}`
    const tokenURL = `${originURL}/reset-password/${token}`;
    return {
        url: tokenURL,
        token
    }
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
