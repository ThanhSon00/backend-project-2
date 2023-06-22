const { StatusCodes } = require("http-status-codes");

const validate2Password = async (req, res, next) => {
    const { newPassword, repeatPassword } = req.body;
    console.log(newPassword, repeatPassword);
    if (!newPassword || !repeatPassword) {
        return res.status(StatusCodes.BAD_REQUEST).send('Please fill both passwords');
    }
    if (newPassword != repeatPassword) {
        return res.status(StatusCodes.BAD_REQUEST).send('Passwords are not matched');
    }
    return next();
}

module.exports = validate2Password;