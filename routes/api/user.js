const express = require('express');
const router = express.Router();
const apiErrorHandler = require('../../middleware/api/apiErrorHandler');

const {
    getUsers,
    createUser,
    getUser,
    updateUser,
    getUserConversations,
    createUserFriend,
    getUserFriends,
    deleteUserFriend,
    deleteUserConversation,
} = require('../../controllers/api/user');

router.route('/:id/friends')
    .post(apiErrorHandler(createUserFriend))
    .get(apiErrorHandler(getUserFriends))

router.route('/:id/friends/:friendID')
    .delete(apiErrorHandler(deleteUserFriend));

router.route('/:id/conversations')
    .get(apiErrorHandler(getUserConversations))

router.route('/:id/conversations/:conversationID')
    .delete(apiErrorHandler(deleteUserConversation))

router.route('/:id')
    .get(apiErrorHandler(getUser))
    .patch(apiErrorHandler(updateUser))

router.route('/')
    .get(apiErrorHandler(getUsers))
    .post(apiErrorHandler(createUser));

module.exports = router;