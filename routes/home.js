const express = require('express');
const router = express.Router();
const asyncWrapper = require('../middleware/asyncWrapper');

const {
    renderPage
} = require('../controllers/home');

router.route('/')
    .get(asyncWrapper(renderPage));

module.exports = router;
