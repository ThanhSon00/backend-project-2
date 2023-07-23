const { StatusCodes } = require("http-status-codes");

const apiErrorHandler = fn => (req, res, next) => {
    return Promise
        .resolve(fn(req, res, next))
        .catch((err) => {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message)
        });
};

module.exports = apiErrorHandler;