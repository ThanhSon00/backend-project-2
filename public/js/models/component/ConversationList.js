import Conversation from "./Conversation.js";

export default class ConversationList {
    #user
    #element
    #selectors 

    constructor(user) {
        this.#selectors = 'ul.list-unstyled.chat-list.chat-user-list';
        this.#user = user;
        this.#element = document.querySelector(this.#selectors);
        this.#element.innerHTML = "";
        this.displayOnUI();
    }

    static async createdFrom(user) {
        await user.loadConversations();
        return new ConversationList(user);
    }

    displayOnUI() {
        const conversations = this.#user.conversations;

        for (const conversationData of conversations) {
            const conversation = new Conversation(conversationData, this.#user);
            this.#element.append(conversation.element);
        }
    }

    open(conversationID) {
        const conversations = this.#element.querySelectorAll('li');
        conversations.forEach(conversation => {
            if (conversation.id === conversationID) {
                conversation.dispatchEvent(new Event('click'));
            }
        })
    }
}

