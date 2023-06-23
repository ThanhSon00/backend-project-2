const express = require('express');
const router = express.Router();
const asyncWrapper = require('../middleware/asyncWrapper');
const authenticateUser = require('../middleware/authenticateUser');

const {
    renderPage
} = require('../controllers/home');

router.route('/')
    .get(authenticateUser, asyncWrapper(renderPage));

module.exports = router;
