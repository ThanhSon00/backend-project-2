import { chatAvatarTemplate, chatUserTemplate } from "../../views/home.js";
import { chatLineTemplate } from "../../views/home.js";

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
        const chatAvatarHTML = ejs.render(chatAvatarTemplate, { user });
        const chatUserHTML = ejs.render(chatUserTemplate, { user });
        const chatLineHTML = ejs.render(chatLineTemplate, { 
            chatLine: this.toObject(),
            chatAvatarHTML,
            chatUserHTML,
        });
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
