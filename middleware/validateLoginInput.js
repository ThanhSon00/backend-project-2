const validateLoginInput = async (req, res, next) => {
    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;
    if (!phoneNumber || !password) {
        return res.redirect('/login');
    }
    if (!isStringOfNumbers(phoneNumber)) {
        return res.redirect('/login');
    }
    return next();
}

const isStringOfNumbers = (str) => {
    if (typeof str !== "string") {
        return false;
    }
    for (let i = 0; i < str.length; i++) {
        if (isNaN(parseInt(str[i]))) {
            return false;
        }
    }
    return true;
}

module.exports = validateLoginInput;