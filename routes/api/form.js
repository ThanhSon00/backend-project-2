const express = require('express');
const router = express.Router();
const apiErrorHandler = require('../../middleware/api/apiErrorHandler');

const {
    createForm
} = require('../../services/api/form');

router.route('/')
        .post(apiErrorHandler(createForm));

module.exports = router;