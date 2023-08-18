
import { getOwlItemHTML, owlItemTemplate } from "../../views/home.js";
import User from "../data/User.js";

export default class OwlItem {
    #friend;
    #element;
    #elementStyle;
    #user;
    
    constructor(user, friend, elementStyle) {
        if (!(user instanceof User)) throw new Error('Must be user type');

        this.#friend = friend;    
        this.#elementStyle = elementStyle;
        this.#user = user;
        this.#createElement();
        
        friend.owlItem = this;
    }

    #createElement() {
        const owlItemElement = document.createElement('div');        
        owlItemElement.setAttribute('style', this.#elementStyle);
        owlItemElement.className = "owl-item active";
        owlItemElement.innerHTML = getOwlItemHTML(this.#friend);
        owlItemElement.id = this.#friend._id;
        this.#element = owlItemElement;
        this.updateStatus();
        this.#addClickEventListener();
    }

    updateStatus() {
        this.#element.querySelector('span').className = (this.#friend.isOnline) ? "user-status" : "";
    }

    #addClickEventListener() {
        const conversationHasFriend = (conversation) => {
            for (let i = 0; i < conversation.members.length; i++) {
                const member = conversation.members[i];
                if (member._id == this.#friend._id) {
                    return true;
                }
            }
            return false;
        }
        const conversation = this.#user.conversations.find(conversationHasFriend);
        this.#element.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            document.querySelector(`li[id="${conversation._id}"]`).dispatchEvent(new Event('click'));
        });
    }

    get element() {
        return this.#element;
    }
}