const { Conversation: ConversationModel} = require('../../models/api/Conversation');
const { User: UserModel } = require('../../models/api/User');
const { ChatLine: ChatLineModel } = require('../../models/api/ChatLine');
const { StatusCodes } = require('http-status-codes');
const mongoose = require('../../database/connect')

const createConversation = async (req, res) => {
    const { name, members, chatLines, description, avatar } = req.body;
    const normalInfo = { name, avatar };
    const conversationData = { normalInfo, members, chatLines, description };

    if (!members) return res.status(StatusCodes.BAD_REQUEST).send('Must have members');
    
    const conversation = await ConversationModel.create(conversationData);
    for (let i = 0; i < members.length; i++) {
        const user = await UserModel.findById(members[i]._id);
        user.conversations.push(conversation);
        await user.save();    
    }        

    return res.status(StatusCodes.CREATED).json(conversation);
}

const getConversation = async (req, res) => {
    const { conversationID } = req.params;
    const conversation = await ConversationModel.findById(conversationID, 'normalInfo');
    return res.status(StatusCodes.OK).json(conversation);
}

const getConversationChatLines = async (req, res) => {
    const { conversationID } = req.params;
    const conversation = await ConversationModel.findById(conversationID, 'chatLines');
    const chatLines = conversation?.chatLines;
    return res.status(StatusCodes.OK).json(chatLines);
}

const getConversationUsers = async (req, res) => {
    const { conversationID } = req.params;
    const conversation = await ConversationModel.findById(conversationID, 'members');
    const members = conversation?.members;
    return res.status(StatusCodes.OK).json(members);
}

const createConversationChatLine = async (req, res) => {
    const { conversationID } = req.params;
    const { content, userID }  = req.body;
    const chatLineData = {
        content,
        userID: new mongoose.Types.ObjectId(userID),
    };
    const conversation = await ConversationModel.findById(conversationID);
    conversation.chatLines.push(chatLineData);
    const updatedConversation = await conversation.save();
    const chatLinesLength = updatedConversation.chatLines.length;
    const chatLine = updatedConversation.chatLines[chatLinesLength - 1];

    return res.status(StatusCodes.CREATED).json(chatLine);
}

const createConversationUser = async (req, res) => {
    const { conversationID } = req.params;
    let members = req.body;
    try { 
        members = JSON.parse(JSON.stringify(members));
        if (!Array.isArray(members)) {
            return res.status(StatusCodes.BAD_REQUEST).send('Please insert array of members in conversation');
        }
    } catch {
        return res.status(StatusCodes.BAD_REQUEST).send('Please insert array of members in conversation');
    }
    
    const conversation = await ConversationModel.findById(conversationID)    
    for (let i = 0; i < members.length; i++) {
        const user = await UserModel.findById(members[i]._id);
        conversation.members.push(members[i]);
        user.conversations.push(conversation);
        console.log(user);
        await user.save();    
    }
    await conversation.save();

    return res.status(StatusCodes.CREATED).json(members);
}

module.exports = {
    createConversation,
    getConversation,
    getConversationChatLines,
    getConversationUsers,
    createConversationChatLine,
    createConversationUser,
}