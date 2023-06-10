const validator = require('validator');
const { StatusCodes } = require('http-status-codes');

const validateLoginInput = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).send("Please fill both email and password");
    }
    if (!validator.default.isEmail(email)) {
        return res.status(StatusCodes.BAD_REQUEST).send("Email not valid");
    }
    return next();
}

module.exports = validateLoginInput;