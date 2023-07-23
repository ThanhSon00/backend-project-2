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
        const users = await UserModel.getUsers({ 'securityInfo.selector': selector });
        const user = users[0];
        if (!user) return res.status(StatusCodes.UNAUTHORIZED).send("Remember token not valid");
        if (!rememberTokenIsValid()) {
            return res.status(StatusCodes.UNAUTHORIZED).send("Remember token not valid");
        }
        req.body.user = user;
        return next();

        function rememberTokenIsValid() {
            return hash(validator.toString()) === user.securityInfo.validator;
        }
    })
}

module.exports = checkRememberToken;