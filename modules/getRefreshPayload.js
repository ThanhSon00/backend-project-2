const deepCopy = require("./deepCopy");
const refreshTTL = parseInt(process.env.REFRESH_TTL);
const { v4: uuidv4 } = require('uuid');
const filterObject = require('../modules/filterObject');

const getRefreshPayload = (user) => {
    const filteredUser = filterObject(user, ['_id']);
    const newPayload = deepCopy(filteredUser);
    newPayload.exp = Math.floor(Date.now() / 1000) + (refreshTTL * 60 * 60);
    newPayload.nbf = Math.floor(Date.now() / 1000);
    newPayload.iat = Math.floor(Date.now() / 1000);
    newPayload.jti = uuidv4();
    return newPayload;
}

module.exports = getRefreshPayload;