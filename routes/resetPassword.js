const express = require('express');
const router = express.Router();
const { validate2Password } = require('../middleware/validator');
const checkLogged = require('../middleware/checkLogged');
const asyncWrapper = require('../middleware/asyncWrapper');

const {
    renderPage,
    resetPassword,
} = require('../controllers/resetPassword');

router.route('/')
    .get(checkLogged, renderPage)
    .post(validate2Password, asyncWrapper(resetPassword));

    

module.exports = router;


