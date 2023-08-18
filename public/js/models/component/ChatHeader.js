import { getAvatarHTML } from "../../views/home.js";
import ConversationData from "../data/Conversation.js";

export default class ChatHeader {
    #conversationData;
    #selectors;
    #element;
    #avatarElement;
    #nameElement;

    constructor(conversationData) {
        if (!(conversationData instanceof ConversationData)) throw new Error("Must be conversationData type");

        this.#conversationData = conversationData;
        this.#selectors = ".p-3.p-lg-4.border-bottom";
        this.#element = document.querySelector(this.#selectors);
        this.#avatarElement = this.#element.querySelector('#chat-header-avatar');
        this.#nameElement = this.#element.querySelector('.text-reset.user-profile-show'); 
        this.#onLoad();
    }

    #onLoad() {
        // this.#avatarElement.setAttribute('src', this.#conversationData.avatar);
        const avatarHTML = getAvatarHTML(this.#conversationData.normalInfo.name, this.#conversationData.normalInfo.avatar)
        this.#nameElement.innerText = this.#conversationData.normalInfo.name;
        this.#avatarElement.innerHTML = avatarHTML;
        this.#updateStatus();
    }

    #updateStatus() {
        if (this.#conversationData.isOnline) {
            this.#element.querySelector('.ri-record-circle-fill')
                .classList.remove('text-white-50');
            this.#element.querySelector('.ri-record-circle-fill')
                .classList.add('text-success');
        } else {
            this.#element.querySelector('.ri-record-circle-fill')
                .classList.remove('text-success');
            this.#element.querySelector('.ri-record-circle-fill')
                .classList.add('text-white-50');
        }
    }
}