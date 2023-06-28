const express = require('express');
const router = express.Router();
const checkAccessToken = require('../../middleware/api/checkAccessToken');
const checkRefreshToken = require('../../middleware/api/checkRefreshToken');
const checkRememberToken = require('../../middleware/api/checkRememberToken');

const {
    updateSession,
    deleteSession,
    createSession,
    getSession,
} = require('../../services/api/session');

router.route('/:accessToken')
    .get(checkAccessToken, getSession)
    .delete(checkAccessToken, deleteSession);

router.route('/')
    .post(createSession)
    .patch(checkRefreshToken, checkRememberToken, updateSession);

module.exports = router;