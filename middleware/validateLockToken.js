const { StatusCodes } = require("http-status-codes");
const { makeRequest } = require("../setting/api");

const validateLockToken = async (req, res, next) => {
    const { token } = req.params;
    if (!token) return res.status(StatusCodes.UNAUTHORIZED).send();
    if (tokenExistMoreThan1Hour(token)) {
        return res.status(StatusCodes.UNAUTHORIZED).send('Session expired');
    }
    makeRequest(`/api/v1/users?lockToken=${token}`, 'GET', null, (err, user) => {
        if (err) {
            return res.status(StatusCodes.BAD_REQUEST).send('Invalid Token');   
        }
        req.body.user = user;
        return next();
    });
}

const tokenExistMoreThan1Hour = (token) => {
    const parts = token.split("-"); 
    const createdTime = parts[parts.length - 1];
    const currentTime = new Date().getTime();
    const timeDifference = (currentTime - createdTime) / (1000 * 60 * 60);
    return timeDifference > 1;
}

module.exports = validateLockToken;