import { getAvatarHTML } from "../../views/home.js";
import Conversation from "./Conversation.js";

export default class ChatHeader {
    #conversation;
    #selectors;
    #element;
    #avatarElement;
    #nameElement;

    constructor(conversation) {
        if (!(conversation instanceof Conversation)) throw new Error("Must be conversation type");
        
        this.#conversation = conversation;
        this.#selectors = ".p-3.p-lg-4.border-bottom";
        this.#element = document.querySelector(this.#selectors);
        this.#avatarElement = this.#element.querySelector('#chat-header-avatar');
        this.#nameElement = this.#element.querySelector('.text-reset.user-profile-show'); 
        this.#onLoad();
    }

    #onLoad() {
        // this.#avatarElement.setAttribute('src', this.#conversation.avatar);
        const avatarHTML = getAvatarHTML(this.#conversation.normalInfo.name, this.#conversation.normalInfo.avatar)
        this.#nameElement.innerText = this.#conversation.name;
        this.#avatarElement.innerHTML = avatarHTML;
    }


}