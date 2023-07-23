const { StatusCodes } = require("http-status-codes");

const getCredential = async (req, res) => {
    const { user } = req.body;
    return res.status(StatusCodes.OK).json(user);
}

module.exports = {
    getCredential,
}