const validator = require('validator');
const { StatusCodes } = require('http-status-codes');

const validateLoginInput = async (req, res, next) => {
    const { email, password, credential, selector, name } = req.body;
    if (userLoginByGoogle(credential) || userLoginByFacebook(selector, name)) {
        return next();
    }
    if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).send("Please fill both email and password");
    }
    if (!validator.default.isEmail(email)) {
        return res.status(StatusCodes.BAD_REQUEST).send("Email not valid");
    }
    return next();
}

const userLoginByGoogle = (credential) => {
    if (credential) return true;
    return false;
}

const userLoginByFacebook = (name, selector) => {
    if (name && selector) return true;
    return false;
}
module.exports = validateLoginInput;