const express = require('express');
const router = express.Router();

const {
    renderPage,
} = require('../controllers/resetPassword');

router.route('/')
    .get(renderPage);

module.exports = router;