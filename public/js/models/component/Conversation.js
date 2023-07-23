import { conversationTemplate } from "../../views/home.js";
import User from "../data/User.js"

export default class Conversation {
    #_id;
    #name;
    #chatLines;
    #members;
    #isGroup;

    #element;
    #user;

    constructor(conversation, user) {
        this.#_id = conversation._id;
        this.#name = conversation.name;
        this.#isGroup = conversation.isGroup;
        this.#user = user;
        this.#createElement();

    }


    #createElement() {
        const conversationElement = document.createElement('li');
        const conversationHTML = ejs.render(conversationTemplate, { conversation: this.#toObject() });
        conversationElement.innerHTML = conversationHTML;
        this.#element = conversationElement;
    }

    #toObject() {
        return {
            _id: this.#_id,
            name: this.#name,
            isGroup: this.isGroup,
        }
    }

    get _id() {
        return this.#_id;
    }

    get members() {
        return this.#members;
    }

    get chatLines() {
        return this.#chatLines;
    }

    get members() {
        return this.#members;
    }

    get element() {
        return this.#element;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }
}
