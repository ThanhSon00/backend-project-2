
import { getOwlItemHTML, owlItemTemplate } from "../../views/home.js";
import User from "../data/User.js";

export default class OwlItem {
    #friend;
    #element;
    #elementStyle;
    #user;
    
    constructor(user, friend, elementStyle) {
        if (!(user instanceof User)) throw new Error('Must be user type');
        if (!(friend instanceof User)) throw new Error('Must be user type');
        this.#friend = friend;    
        this.#elementStyle = elementStyle;
        this.#user = user;
        this.#createElement();
    }

    #createElement() {
        const owlItemElement = document.createElement('div');        
        owlItemElement.setAttribute('style', this.#elementStyle);
        owlItemElement.className = "owl-item active";
        owlItemElement.innerHTML = getOwlItemHTML(this.#friend);
        owlItemElement.id = this.#friend._id;
        this.#element = owlItemElement;
        this.#addClickEventListener();
    }

    async #addClickEventListener() {
        await this.#user.loadConversations();
        const userConversations = this.#user.conversations;
        const conversationHasFriend = (conversation) => {
            for (let i = 0; i < conversation.members.length; i++) {
                const member = conversation.members[i];
                if (member._id == this.#friend._id) {
                    return true;
                }
            }
            return false;
        }
        const conversation = userConversations.find(conversationHasFriend);
        this.#element.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            document.querySelector(`li[id="${conversation._id}"]`).dispatchEvent(new Event('click'));
        });
    }

    get element() {
        return this.#element;
    }
}