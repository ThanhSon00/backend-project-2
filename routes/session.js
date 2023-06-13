const express = require('express');
const router = express.Router();
const asyncWrapper = require('../middleware/asyncWrapper');
const checkAccessToken = require('../middleware/checkAccessToken');
const checkRefreshToken = require('../middleware/checkRefreshToken');
const checkRememberToken = require('../middleware/checkRememberToken');
const validateLoginInput = require('../middleware/validateLoginInput');
const login = require('../middleware/login');

const {
    updateSession,
    deleteSession,
    createSession,
    getSession,
} = require('../controllers/session');

// GET and DELETE 1
router.route('/:accessToken')
    .get(checkAccessToken, asyncWrapper(getSession))
    .delete(checkAccessToken, asyncWrapper(deleteSession));

// POST
router.route('/').post(validateLoginInput)
router.route('/').post(login, asyncWrapper(createSession))

// PATCH 1
router.route('/').patch(checkRefreshToken, checkRememberToken);
router.route('/').patch(asyncWrapper(updateSession));

module.exports = router;