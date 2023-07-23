import ConversationList from "./ConversationList.js";

export default class ChatPage {
    #conversationList;
    constructor(user) {
        this.#conversationList = ConversationList.createdFrom(user);
    }

    get conversationList() {
        return this.#conversationList;
    }
}