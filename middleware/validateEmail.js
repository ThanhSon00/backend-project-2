const { makeRequest } = require('../setting/api')
const validator = require('validator');
const { StatusCodes } = require('http-status-codes');

const validateEmail = async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return res.status(StatusCodes.BAD_REQUEST).send('Please fill out your email');
    }
    if (!validator.default.isEmail(email)) {
        return res.status(StatusCodes.BAD_REQUEST).send('Email not valid');
    }
    makeRequest(`/api/v1/users?email=${email}`, 'GET', null, (err, user) => {
        if (err?.response?.status === StatusCodes.NOT_FOUND || user.isGoogleUser) {
            return res.status(StatusCodes.NOT_FOUND).send('Email not found');
        }
        req.body._id = user._id;
        req.body.name = user.email;
        return next();
    });
}

module.exports = validateEmail