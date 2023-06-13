const { makeRequest } = require("../setting/api");

const validateLockToken = async (req, res, next) => {
    const { token } = req.params;
    makeRequest(`/api/v1/users?lockToken=${token}`, 'GET', null, (err, user) => {
        if (err) {
            return res.redirect('back');   
        }
        req.body.user = user;
        return next();
    });
}

module.exports = validateLockToken;