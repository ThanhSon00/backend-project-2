import User from "../data/User.js";
import EditUserNameSection from "./EditUserNameSection.js";
import NameBox from "./NameBox.js";

export default class SettingEditButton {
    #selectors;
    #element;
    #user;
    #nameBox

    constructor(user, nameBox) {
        if (!(user instanceof User)) throw new Error("Must be user type");
        if (!(nameBox instanceof NameBox)) throw new Error("Must be Name Box type");

        this.#user = user;
        this.#nameBox = nameBox;
        this.#selectors = "#setting_edit_button";
        this.#element = document.querySelector(this.#selectors);
        this.#addClickEventListener();
    }

    #addClickEventListener() {
        this.#element.addEventListener('click', (event) => {
            EditUserNameSection.createdFrom(this.#user, this);
            this.#nameBox.hide();
        })
    }

    hidden() {
        this.#element.classList.add('visually-hidden');       
    }

    show() {
        this.#element.classList.remove('visually-hidden');       
    }

    get nameBox() {
        return this.#nameBox;
    }
}