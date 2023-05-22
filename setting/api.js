const axios = require('axios');
const domain = process.env.DOMAIN;
const protocol = process.env.PROTOCOL;
const port = process.env.PORT;
const timeout = process.env.TIMEOUT;

const url = `${protocol}://${domain}:${port}`;
const restAPI = `${url}/api/v1`;

const root = axios.create({
    baseURL: url,
    timeout
})

const api = axios.create({
    baseURL: restAPI,
    timeout
})

module.exports = {
    root,
    api,
}