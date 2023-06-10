
const getRememberPayload = (user) => {
    const newPayload = {};
    newPayload.selector = user.selector;
    newPayload.validator = Math.floor(Math.random() * 9000000000) + 1000000000;
    return newPayload;
}

module.exports = getRememberPayload;
