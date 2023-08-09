import { chatAvatarTemplate, chatUserIdTemplate, chatUserTemplate, getChatLineHTML } from "../../views/home.js";
import { chatLineTemplate } from "../../views/home.js";
import User from "../data/User.js";

export default class ChatLine{
    #userID;
    #content;
    #timestamp;
    #user;

    constructor(chatLineData) {
        this.#content = chatLineData.content;
        this.#timestamp = chatLineData.timestamp;
        this.#userID = chatLineData.userID;
        this.#user = chatLineData.user;
    }
    
    get userID() {
        return this.#userID;
    }

    createElement() {
        const chatLineHTML = this.#render(this.#user);
        const chatLineEle = document.createElement('li');
        chatLineEle.innerHTML = chatLineHTML;
        return chatLineEle;
    }

    #render(user) {
        const chatLineHTML = getChatLineHTML(user, this);
        return chatLineHTML;        
    }

    toObject() {
        return {
            userID: this.#userID,
            content: this.#content,
            timestamp: this.#timestamp,
        }
    }
}
