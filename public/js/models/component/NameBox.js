import User from "../data/User.js";

export default class NameBox {
    #selectors
    #element
    #user

    constructor(user) {
        if (!(user instanceof User)) throw new Error("Must be user type");

        this.#selectors = "#user_name";
        this.#element = document.querySelector(this.#selectors);
        this.#user = user;
        this.#element.innerText = user.normalInfo.title;
    }

    get value() {
        return this.#element.innerText;
    }

    hide() {
        this.#element.classList.add('visually-hidden');
    }

    show(value) {
        this.#element.innerText = value;
        this.#element.classList.remove('visually-hidden');
    }
}