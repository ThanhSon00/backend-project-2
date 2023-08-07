import FriendRequestForm from "./FriendRequestForm.js";
import User from "../data/User.js"

export default class FriendRequestIcon {
    #selectors
    #user
    #element

    constructor(user) {
        if (!(user instanceof User)) throw new Error("Must be User type");
   
        this.#user = user;
        this.#selectors = '#addContact-exampleModal';
        this.#element = document.querySelector(this.#selectors);
        this.#addClickEventListener();
    }

    #addClickEventListener() {
        this.#element.addEventListener('click', () => {
            new FriendRequestForm(this.#user);
        });
    }
    
    get element() {
        return document.querySelector(this.#selectors);
    }
}