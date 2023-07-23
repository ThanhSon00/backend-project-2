const express = require('express');
const router = express.Router();
const apiErrorHandler = require('../../middleware/api/apiErrorHandler');

const {
    createConversation,
    getConversation,
    getConversationChatLines,
    getConversationUsers,
    createConversationChatLine,
    createConversationUser,
} = require('../../controllers/api/conversation');

router.route('/:conversationID/users')
    .get(apiErrorHandler(getConversationUsers))
    .post(apiErrorHandler(createConversationUser));

router.route('/:conversationID/chat-lines')
    .get(apiErrorHandler(getConversationChatLines))
    .post(apiErrorHandler(createConversationChatLine));

router.route('/:conversationID')
    .get(apiErrorHandler(getConversation));

router.route('/')
    .post(apiErrorHandler(createConversation));

module.exports = router;