import { conversationTemplate } from "../../views/home.js";
import User from "../data/User.js"
import ChatLineBox from "./ChatLineBox.js";
import ChatLineInput from "./ChatLineInput.js";
import SendChatLineBtn from "./SendChatLineBtn.js";

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

    async loadAndGetChatLines() {
        const response = await fetch(`/api/v1/conversations/${this.#_id}/chat-lines`);
        const chatLines = await response.json();
        this.#chatLines = chatLines;
        return this.#chatLines;
    }

    async loadAndGetMembers() {
        const response = await fetch(`/api/v1/conversations/${this.#_id}/users`);
        const users = await response.json();
        const members = [];
        users.forEach((user) => members.push(new User(user)))
        this.#members = members;
        return this.#members;
    }

    #createElement() {
        const conversationElement = document.createElement('li');
        const conversationHTML = ejs.render(conversationTemplate, { conversation: this.#toObject() });
        conversationElement.innerHTML = conversationHTML;
        this.#element = conversationElement;
        this.#addClickEventHandler();
    }

    #toObject() {
        return {
            _id: this.#_id,
            name: this.#name,
            isGroup: this.isGroup,
        }
    }

    #addClickEventHandler() {
        this.#element.addEventListener('click', (event) => {
            const user = this.#user;          
            const chatLineBox = new ChatLineBox(this, user);
            const chatLineInput = new ChatLineInput(chatLineBox);
            const sendChatLineBtn = new SendChatLineBtn(chatLineInput, chatLineBox);

            const simpleBar = document.querySelectorAll('.simplebar-content-wrapper')[6];
            simpleBar.scrollTop = simpleBar.scrollHeight;
        })    
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
