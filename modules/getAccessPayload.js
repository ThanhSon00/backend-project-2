const deepCopy = require("./deepCopy");
const accessTTL = parseInt(process.env.ACCESS_TTL);
const filterObject = require('../modules/filterObject');

const getAccessPayload = (user) => {
    const filteredUser = filterObject(user, ['_id', 'normalInfo', 'securityInfo.selector']);
    const newPayload = deepCopy(filteredUser);
    newPayload.exp = Math.floor(Date.now() / 1000) + (accessTTL * 60);
    newPayload.nbf = Math.floor(Date.now() / 1000);
    newPayload.iat = Math.floor(Date.now() / 1000);
    return newPayload;
}

module.exports = getAccessPayload;