const express = require('express');
const router = express.Router();
const asyncWrapper = require('../middleware/asyncWrapper');
const { validateLoginInput } = require('../middleware/validator');
const checkLogged = require('../middleware/checkLogged');

const { 
    renderPage,
    doLogin,
} = require('../controllers/login');

router.route('/')
    .get(checkLogged, renderPage)
    .post(validateLoginInput, asyncWrapper(doLogin));

module.exports = router;