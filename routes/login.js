const express = require('express');
const { renderPage } = require('../controllers/login');
const router = express.Router();

router.route('/')
    .get(renderPage);

module.exports = router;