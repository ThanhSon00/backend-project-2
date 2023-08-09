const express = require('express');
const router = express.Router();

const {
    getCredential
} = require('../controllers/credential');

router.route('/')
    .get(getCredential);

module.exports = router;