const express = require('express');
const asyncWrapper = require('../middleware/asyncWrapper');
const router = express.Router();
const checkLogged = require('../middleware/checkLogged');

const { 
    renderPage,
    loginHandler,
} = require('../controllers/login');

router.route('/')
    .get(checkLogged, renderPage)
    .post(asyncWrapper(loginHandler));

module.exports = router;