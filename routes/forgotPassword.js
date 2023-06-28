const express = require('express');
const router = express.Router();
const checkLogged = require('../middleware/checkLogged');
const { validateEmail } = require('../middleware/validator');

const {
    renderPage,
    sendMailResetPwd,    
} = require('../controllers/forgotPassword');

router.route(`/`)
    .get(checkLogged, renderPage)
    .post(validateEmail, sendMailResetPwd);

module.exports = router;