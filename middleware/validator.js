const { StatusCodes } = require("http-status-codes");
const validator = require('validator');
const UserModel = require('../models/User');

const validate2Password = async (req, res, next) => {
    const { newPassword, repeatPassword } = req.body;
    if (!newPassword || !repeatPassword) {
        return res.status(StatusCodes.BAD_REQUEST).send('Please fill both passwords');
    }
    if (newPassword != repeatPassword) {
        return res.status(StatusCodes.BAD_REQUEST).send('Passwords are not matched');
    }
    return next();
}

const validateEmail = async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return res.status(StatusCodes.BAD_REQUEST).send('Please fill out your email');
    }
    if (!validator.default.isEmail(email)) {
        return res.status(StatusCodes.BAD_REQUEST).send('Email not valid');
    }
    
    const users = await UserModel.getUsers({ 'normalInfo.email': email });
    const user = users[0];
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).send('Email not found');
    }    
    req.body._id = user._id;
    req.body.name = user.normalInfo.email;
    req.body.user = user;
    return next();
}

const validateLockToken = async (req, res, next) => {
    const { token } = req.params;
    if (!token) return res.status(StatusCodes.UNAUTHORIZED).send();
    if (tokenExistMoreThan1Hour()) {
        return res.status(StatusCodes.UNAUTHORIZED).send('Session expired');
    }

    const users = await UserModel.getUsers({ 'securityInfo.lockToken': token });
    const user = users[0];
    if (!user) return res.status(StatusCodes.BAD_REQUEST).send('Invalid Token');   
    req.body.user = user;
    return next();

    function tokenExistMoreThan1Hour() {
        const parts = token.split("-");
        const createdTime = parts[parts.length - 1];
        const currentTime = new Date().getTime();
        const timeDifference = (currentTime - createdTime) / (1000 * 60 * 60);
        return timeDifference > 1;
    }
}

const validateLoginInput = async (req, res, next) => {
    const { email, password, credential, selector, name } = req.body;
    if (userLoginByGoogle() || userLoginByFacebook()) {
        return next();
    }
    if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).send("Please fill both email and password");
    }
    if (!validator.default.isEmail(email)) {
        return res.status(StatusCodes.BAD_REQUEST).send("Email not valid");
    }
    return next();
    
    function userLoginByGoogle() {
        if (credential) return true;
        return false;
    }

    function userLoginByFacebook() {
        if (name && selector) return true;
        return false;    
    }
}

module.exports = {
    validate2Password,
    validateEmail,
    validateLockToken,
    validateLoginInput
}
