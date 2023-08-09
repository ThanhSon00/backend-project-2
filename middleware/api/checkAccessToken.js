const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const checkAccessToken = async(req, res, next) => {
    const accessToken = req.params.accessToken || req.cookies.access_token;    
    jwt.verify(accessToken, process.env.ACCESS_SECRET, (err, user) => {
        if (err) {
            return res.status(StatusCodes.UNAUTHORIZED).send('Access token not valid');
        }
        req.body.user = user;
        return next();
    })
}

module.exports = checkAccessToken;