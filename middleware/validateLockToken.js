const { makeRequest } = require("../setting/api");

const validateLockToken = async (req, res, next) => {
    const { token } = req.params;
    if (tokenExistMoreThan1Hour(token)) {
        return res.redirect('back');
    }
    makeRequest(`/api/v1/users?lockToken=${token}`, 'GET', null, (err, user) => {
        if (err) {
            return res.redirect('back');   
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