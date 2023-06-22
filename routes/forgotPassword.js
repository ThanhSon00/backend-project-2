const express = require('express');
const router = express.Router();
const validateEmail = require('../middleware/validateEmail');
const checkLogged = require('../middleware/checkLogged');

const {
    renderPage,
    sendMailResetPwd,    
} = require('../controllers/forgotPassword');

router.route(`/`)
    .get(checkLogged, renderPage)
    .post(validateEmail, sendMailResetPwd);

module.exports = router;