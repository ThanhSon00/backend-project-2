import  Conversation  from "./Conversation.js"
import ChatLine from "./ChatLine.js";
import User from "../data/User.js";

export default class ChatLineBox {
    #conversation
    #user
    #selectors
    #element

    constructor(conversation, user) {
        if (!(conversation instanceof Conversation)) throw new Error("Must be conversation type");
        if (!(user instanceof User)) throw new Error("Must be user type");

        this.#displayBox();
        this.#conversation = conversation;
        this.#user = user;
        this.#selectors = "ul.list-unstyled.mb-0";
        this.#element = document.querySelector(this.#selectors);
        this.#displayChatLines();
    }

    #displayBox() {
        const box = document.querySelector('.user-chat.w-100');
        const welcomeSection = document.querySelector('.chat-welcome-section');
        welcomeSection.classList.add('d-none');
        box.classList.remove('d-none');
    }

    async #displayChatLines() {
        const members = await this.#conversation.loadAndGetMembers();
        const chatLines = await this.#conversation.loadAndGetChatLines();

        this.#element.innerHTML = "";
        
        if (!chatLines) return;
        for (const chatLineData of chatLines) {
            this.#insertChatLine(chatLineData);
        }

        this.#moveToBottom();
    }
    
    displayChatLine(chatLine) {
        this.#insertChatLine(chatLine);
        this.#moveToBottom();
    }

    #insertChatLine(chatLineData) {
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

    #moveToBottom() {
        const simpleBar = document.querySelectorAll('.simplebar-content-wrapper')[6];
        simpleBar.scrollTop = simpleBar.scrollHeight;
    }
 
    changeConversation(conversation) {
        this.#conversation = conversation;
        this.#displayChatLines();
    }

    get user() {
        return this.#user;
    }

    get conversation() {
        return this.#conversation;
    }
}