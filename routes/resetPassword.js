const express = require('express');
const router = express.Router();

const {
    renderPage,
} = require('../controllers/resetPassword');

router.route('/:token')
    .get(renderPage)
module.exports = router;