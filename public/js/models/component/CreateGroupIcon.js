import CreateGroupForm from "./CreateGroupForm.js";
import User from "../data/User.js"

export default class CreateGroupIcon {
    #selectors;
    #user;
    #element;
    constructor(user) {
        if (!(user instanceof User)) throw new Error("Must be User type");

        this.#user = user;
        this.#selectors = "#create-group-icon";
        this.#element = document.querySelector(this.#selectors);
        this.#element.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            CreateGroupForm.generate(user);
        })
    }
}