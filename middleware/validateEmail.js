const { makeRequest } = require('../setting/api')
const validator = require('validator');
const { StatusCodes } = require('http-status-codes');

const validateEmail = async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        res.cookie('message', 'Please fill out your email');
        return res.redirect('back');
    }
    if (!validator.default.isEmail(email)) {
        res.cookie('message', 'Email not valid');
        return res.redirect('back');
    }
    makeRequest(`/api/v1/users?email=${email}`, 'GET', null, (err, user) => {
        if (err?.response?.status === StatusCodes.NOT_FOUND || user.isGoogleUser) {
            res.cookie('message', 'Email not found');
            return res.redirect('back');
        }
        req.body._id = user._id;
        req.body.name = user.email;
        return next();
    });
}

module.exports = validateEmail