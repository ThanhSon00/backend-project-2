const express = require('express');
const router = express.Router();
const validateEmail = require('../middleware/validateEmail');

const {
    renderPage,
    sendMailResetPwd,    
} = require('../controllers/forgotPassword');

router.route(`/`)
    .get(renderPage)
    .post(validateEmail, sendMailResetPwd);

module.exports = router;