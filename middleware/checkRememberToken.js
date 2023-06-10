const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { makeRequest } = require('../setting/api')
const hash = require('../modules/hash');

const checkRememberToken = async (req, res, next) => {
    const { rememberToken } = req.body;
    jwt.verify(rememberToken, process.env.REMEMBER_SECRET, async (err, payload) => {
        if (err) {
            return res.status(StatusCodes.UNAUTHORIZED).send("Remember token not valid");
        }
        const { validator, selector } = payload;
        makeRequest(`/api/v1/users?selector=${selector}`, 'GET', null, (err, user) => {
            if (err) {
                return res.status(StatusCodes.UNAUTHORIZED).send("Remember token not valid");
            }
            if (hash(validator.toString()) != user.validator) {
                return res.status(StatusCodes.UNAUTHORIZED).send("Remember token not valid");
            }
            req.body.user = user;
            return next();
        });
    })
}

module.exports = checkRememberToken;