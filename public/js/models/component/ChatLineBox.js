import  Conversation  from "./Conversation.js"
import ChatLine from "./ChatLine.js";
import User from "../data/User.js";

export default class ChatLineBox {
    #conversation
    #user
    #selectors
    #element

    constructor(conversation, user) {
        this.#conversation = conversation;
        this.#user = user;
        this.#selectors = "ul.list-unstyled.mb-0";
        this.#element = document.querySelector(this.#selectors);
        this.#displayChatLines();
    }

    async #displayChatLines() {
        const members = await this.#conversation.loadAndGetMembers();
        const chatLines = await this.#conversation.loadAndGetChatLines();

        this.#element.innerHTML = "";
        
        if (!chatLines) return;
        for (const chatLineData of chatLines) {
            this.displayChatLine(chatLineData);
        }
    }

    displayChatLine(chatLineData) {
        const chatLineElement = this.#createUserChatLineElement(chatLineData);
        const chatLineContentElement = chatLineElement.querySelector('.ctext-wrap');
        const lastChatLineElement = this.#element.lastElementChild;
        const appendChatLine = () => this.#element.appendChild(chatLineElement);
        
        if (!lastChatLineElement) return appendChatLine();

        const conversationNameElement = lastChatLineElement.querySelector('.conversation-name');
        const lastChatLineUserID = lastChatLineElement.querySelector("input.user-id").value;

        if (lastChatLineUserID === chatLineData.userID) {
            lastChatLineElement
                .querySelector('.user-chat-content')
                .insertBefore(chatLineContentElement, conversationNameElement);
        } else return appendChatLine();

    }

    #createUserChatLineElement(chatLineData) {
        const members = this.#conversation.members;
        const userIsSender = (chatLineData.userID === this.#user._id);
        const chatLineUser = userIsSender ?
            this.#user :
            members.find(obj => obj._id === chatLineData.userID);

        chatLineData.user = chatLineUser;

        const chatLine = new ChatLine(chatLineData);
        const chatLineElement = chatLine.createElement();

        chatLineElement.className = userIsSender ? 'right' : '';
        return chatLineElement;
    }

    
    get user() {
        return this.#user;
    }

    get conversation() {
        return this.#conversation;
    }
}