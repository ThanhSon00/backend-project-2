const express = require('express');
const router = express.Router();
const validateLoginInput = require('../middleware/validateLoginInput');

const { 
    renderPage,
    login
} = require('../controllers/login');

router.route('/')
    .get(renderPage)
    .post(validateLoginInput, login);

module.exports = router;