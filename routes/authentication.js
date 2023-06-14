const express = require('express');
const router = express.Router();
const validateEmail = require('../middleware/validateEmail');
const asyncWrapper = require('../middleware/asyncWrapper');
const authenticateUser = require('../middleware/authenticateUser');

const { 
    login,
    refreshSession,
    revokeSession,
    sendMailResetPwd,
} = require('../controllers/authentication');

router.route('/send-mail-reset-password')
    .post(validateEmail, asyncWrapper(sendMailResetPwd))

router.route('/refresh')
    .get(asyncWrapper(refreshSession));

router.route('/revoke')
    .get(authenticateUser, asyncWrapper(revokeSession));

router.route('/')
    .post(asyncWrapper(login));

module.exports = router;