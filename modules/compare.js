const hash = require('./hash');

const compare = (str, hashStr) => {
    return hash(str) === hashStr;
}

module.exports = compare;