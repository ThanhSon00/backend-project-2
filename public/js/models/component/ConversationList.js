import User from "../data/User.js";
import Conversation from "./Conversation.js";

export default class ConversationList {
    #user
    #element
    #selectors
    #components 

    constructor(user) {
        if (!(user instanceof User)) throw new Error("Must be user type");

        this.#components = [];
        this.#selectors = 'ul.list-unstyled.chat-list.chat-user-list';
        this.#user = user;
        this.#element = document.querySelector(this.#selectors);
        this.#element.innerHTML = "";
        this.displayOnUI();
    }

    static createdFrom(user) {
        return new ConversationList(user);
    }

    async displayOnUI() {
        for (const conversationData of this.#user.conversations) {
            const conversation = await Conversation.createdFrom(conversationData, this);
            
            this.#element.append(conversation.element);
            this.#components.push(conversation);
        }
    }



    #addClickEventListener(conversation) {
        if (!(conversation instanceof Conversation)) throw new Error("Must be conversation component type");
        conversation.element.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            this.#element.querySelectorAll('li').forEach(element => {
                if (element.classList.contains('active')) {
                    element.classList.remove('active');
                    
                }
            })
            conversation.element.classList.add('active');
        })
    }

    open(conversationID) {
        const conversations = this.#element.querySelectorAll('li');
        conversations.forEach(conversation => {
            if (conversation.id === conversationID) {
                conversation.dispatchEvent(new Event('click'));
            }
        })
    }

    get user() {
        return this.#user;
    }

    get components() {
        return this.#components;
    }
}

