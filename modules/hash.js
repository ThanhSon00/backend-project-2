const crypto = require('crypto');

const hash = (str) => {
    const secret = process.env.SHA256_SECRET;
    const message = str;
    const hash = crypto.createHmac('sha256', secret)
                       .update(message)
                       .digest('hex');
    return hash;
}

module.exports = hash;