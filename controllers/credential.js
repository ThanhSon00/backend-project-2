const { StatusCodes } = require("http-status-codes");
const { makeRequest } = require('../setting/api');

const getCredential = async (req, res) => {
    const { user } = req.body;
    const fullDataUser = await makeRequest(`/api/v1/users/${user._id}`, 'GET');
    return res.status(StatusCodes.OK).json(fullDataUser);
}

module.exports = {
    getCredential,
}