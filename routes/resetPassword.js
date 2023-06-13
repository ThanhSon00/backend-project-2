const express = require('express');
const router = express.Router();
const validateLockToken = require('../middleware/validateLockToken');
const validate2Password = require('../middleware/validate2Passwords');

const {
    renderPage,
    resetPassword,
} = require('../controllers/resetPassword');

router.route('/:token')
    .get(validateLockToken, renderPage)
    .post(validate2Password, resetPassword)
module.exports = router;