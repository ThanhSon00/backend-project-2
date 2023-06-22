const express = require('express');
const router = express.Router();
const validate2Password = require('../middleware/validate2Passwords');
const checkLogged = require('../middleware/checkLogged');

const {
    renderPage,
    resetPassword,
} = require('../controllers/resetPassword');

router.route('/')
    .get(checkLogged, renderPage)
    .post(validate2Password, resetPassword);

module.exports = router;