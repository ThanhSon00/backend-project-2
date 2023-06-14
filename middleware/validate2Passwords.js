const { otherTokenAttr } = require("../setting/attributes");

const validate2Password = async (req, res, next) => {
    const { newPassword, repeatPassword } = req.body;
    if (!newPassword || !repeatPassword) {
        res.cookie('message', 'Please fill both passwords', otherTokenAttr);
        return res.redirect('back');
    }
    if (newPassword != repeatPassword) {
        res.cookie('message', "Passwords are not matched", otherTokenAttr);
        return res.redirect('back');
    }
    return next();
}

module.exports = validate2Password;