import User from "../data/User.js";
import ContactPage from "./ContactPage.js";

export default class ContactPageIcon {
    #selectors;
    #element;
    #user;

    constructor(user) {
        if (!(user instanceof User)) throw new Error("Must be user type");

        this.#user = user;
        this.#selectors = "#pills-contacts-tab";
        this.#element = document.querySelector(this.#selectors);
        this.#addClickEventListener();
    }

    #addClickEventListener() {
        this.#element.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            new ContactPage(this.#user);
        })
    }
}