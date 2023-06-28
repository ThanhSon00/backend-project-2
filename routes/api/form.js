const express = require('express');
const router = express.Router();
const {
    createForm
} = require('../../services/api/form');

router.route('/')
        .post(createForm);

module.exports = router;