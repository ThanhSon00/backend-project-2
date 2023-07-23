import CreateGroupForm from "./CreateGroupForm.js";

export default class CreateGroupIcon {
    #selectors;
    #user;
    #element;
    constructor(user) {
        this.#user = user;
        this.#selectors = "#create-group-icon";
        this.#element = document.querySelector(this.#selectors);
        this.#element.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            CreateGroupForm.generate(user);
        })
    }
}