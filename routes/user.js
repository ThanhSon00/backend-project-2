const asyncWrapper = require('../middleware/asyncWrapper');
const express = require('express');
const router = express.Router();

const {
    getUsers,
    createUser,
    getUser,
    updateUser
} = require('../controllers/user');

router.route('/:id')
    .get(asyncWrapper(getUser))
    .patch(asyncWrapper(updateUser))

router.route('/')
    .get(asyncWrapper(getUsers))
    .post(asyncWrapper(createUser));

module.exports = router;