const express = require('express');
const asyncWrapper = require('../middleware/asyncWrapper');
const router = express.Router();

const { 
    renderPage,
    loginHandler,
} = require('../controllers/login');

router.route('/')
    .get(renderPage)
    .post(asyncWrapper(loginHandler));

module.exports = router;