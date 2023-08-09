const express = require("express");
const router = express.Router();
const multer = require('multer')
const upload = multer();
const apiErrorHandler = require('../../middleware/api/apiErrorHandler');
const checkAccessToken = require("../../middleware/api/checkAccessToken");

const {
    uploadFile,
} = require('../../services/api/cloud');

// upload
router.route('/')
    .post(upload.single('profile_image'), checkAccessToken, apiErrorHandler(uploadFile));


module.exports = router;