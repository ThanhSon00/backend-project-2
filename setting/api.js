const axios = require('axios');
const domain = process.env.DOMAIN;
const protocol = process.env.PROTOCOL;
const port = process.env.PORT;
let originURL = `${protocol}://${domain}:${port}`;
const fs = require('fs');
const https = require('https');

if (process.env.ENV === "production") {
    originURL = `${protocol}://${domain}`;
}

const makeRequest = async (path, method, body, callback) => {
    if (!body) body = {};
    let response, err;
    const requestOptions = {
        url: `${originURL}${path}`,
        method: method,
        data: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
    }
    if (process.env.ENV === "development") 
    requestOptions.httpsAgent = new https.Agent({ ca: fs.readFileSync('C:/Users/son/AppData/Local/devcert/certificate-authority/certificate.cert') });
    try {
        response = await axios(requestOptions);
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