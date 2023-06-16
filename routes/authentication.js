const express = require('express');
const router = express.Router();
const asyncWrapper = require('../middleware/asyncWrapper');
const authenticateUser = require('../middleware/authenticateUser');

const { 
    loginHandler,
    refreshSession,
    revokeSession,
} = require('../controllers/authentication');

router.route('/refresh')
    .get(asyncWrapper(refreshSession));

router.route('/revoke')
    .get(authenticateUser, asyncWrapper(revokeSession));

router.route('/')
    .post(asyncWrapper(loginHandler));

module.exports = router;