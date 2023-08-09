import User from "../data/User.js";
import SettingEditButton from "./SettingEditButton.js";
import SettingPage from "./SettingPage.js";

export default class SettingIcon {
    #selectors;
    #element;
    #user;

    constructor(user) {
        if (!(user instanceof User)) throw new Error("Must be user type");

        this.#user = user;
        this.#selectors = "#pills-setting-tab";
        this.#element = document.querySelector(this.#selectors);
        this.#addClickEventListener();
    }

    #addClickEventListener() {
        this.#element.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            new SettingPage(this.#user);            
        })
    }
}