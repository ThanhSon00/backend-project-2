const axios = require('axios');
const domain = process.env.DOMAIN;
const protocol = process.env.PROTOCOL;
const port = process.env.PORT;
const originURL = `${protocol}://${domain}:${port}`;

const makeRequest = async (path, method, body, callback) => {
    let response, err;
    try {
        response = await axios({
            url: `${originURL}${path}`,
            method: method,
            data: body
        });
    } catch (error) {
        err = error;
    } finally {
        if (typeof callback === 'function') {
            return callback(err, response?.data);
        }
        return new Promise((resolve, reject) => {
            if (err) {
                reject(err);
            } else {
                resolve(response.data);
            }
        })
    }
}

module.exports = {
    makeRequest,
    originURL,
}