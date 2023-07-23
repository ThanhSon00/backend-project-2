const deepCopy = require("./deepCopy");
const filterObject = require('../modules/filterObject');

const getRememberPayload = (user) => {
    const filteredUser = filterObject(user, ['_id']);
    const newPayload = deepCopy(filteredUser);
    newPayload.selector = user.securityInfo.selector;
    newPayload.validator = Math.floor(Math.random() * 9000000000) + 1000000000;
    return newPayload;
}

module.exports = getRememberPayload;
