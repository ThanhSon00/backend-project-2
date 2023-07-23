import ChatLine from "./ChatLine.js";

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
        for (const chatLineData of chatLines) {
            this.displayChatLine(chatLineData);
        }
    }

    displayChatLine(chatLineData) {
        const chatLineElement = this.#createUserChatLineElement(chatLineData);
        this.#element.appendChild(chatLineElement);
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