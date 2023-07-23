const express = require('express');
const router = express.Router();
const checkAccessToken = require('../../middleware/api/checkAccessToken');
const checkRefreshToken = require('../../middleware/api/checkRefreshToken');
const checkRememberToken = require('../../middleware/api/checkRememberToken');
const apiErrorHandler = require('../../middleware/api/apiErrorHandler');

const {
    updateSession,
    deleteSession,
    createSession,
    getSession,
} = require('../../services/api/session');

router.route('/:accessToken')
    .get(checkAccessToken, apiErrorHandler(getSession))
    .delete(checkAccessToken, apiErrorHandler(deleteSession));

router.route('/')
    .post(apiErrorHandler(createSession))
    .patch(checkRefreshToken, checkRememberToken);
    
router.route('/').patch(apiErrorHandler(updateSession));

module.exports = router;