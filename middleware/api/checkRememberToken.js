const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const hash = require('../../modules/hash');
const UserModel = require('../../models/User');

const checkRememberToken = async (req, res, next) => {
    const { rememberToken } = req.body;
    jwt.verify(rememberToken, process.env.REMEMBER_SECRET, async (err, payload) => {
        if (err) {
            return res.status(StatusCodes.UNAUTHORIZED).send("Remember token not valid");
        }
        const { validator, selector } = payload;
        const user = await UserModel.getUsers({ selector });
        if (!user) return res.status(StatusCodes.UNAUTHORIZED).send("Remember token not valid");
        if (rememberTokenIsValid()) {
            return res.status(StatusCodes.UNAUTHORIZED).send("Remember token not valid");
        }
        req.body.user = user;
        return next();

        function rememberTokenIsValid() {
            return hash(validator.toString()) === user.validator;
        }
    })
}

module.exports = checkRememberToken;