const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const UserModel = require('../../models/User');

const checkRefreshToken = async (req, res, next) => {
    const { refreshToken } = req.body;
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, user) => {
        if (err) {
            // Continue to check remember token
            if (req.body.rememberToken) {
                delete req.body.refreshToken;
                return next();
            }
            return res.status(StatusCodes.UNAUTHORIZED).send("Refresh token not valid");
        }
        
        const dbUser = await UserModel.getUser(user._id);
        if (!dbUser) {
            return res.status(StatusCodes.NOT_FOUND).send('User not found');
        }
        if (user.jti != dbUser.token) {
            return res.status(StatusCodes.UNAUTHORIZED).send("Refresh token not valid");
        }
        req.body.user = dbUser;
        return next();
    })     
}

module.exports = checkRefreshToken;