const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authenticateUser');

const {
    getCredential
} = require('../controllers/credential');

router.route('/')
    .get(authenticateUser, getCredential);

module.exports = router;