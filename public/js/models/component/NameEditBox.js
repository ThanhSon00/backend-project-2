import EditUserNameSection from "./EditUserNameSection.js";

export default class NameEditBox {
    #selectors
    #element
    #editUserNameSection

    constructor(editUserNameSection) {
        if (!(editUserNameSection instanceof EditUserNameSection)) throw new Error('Must be EditUserNameSection type');
    
        this.#selectors = "#name_edit_box";
        this.#element = document.querySelector(this.#selectors);
        this.#editUserNameSection = editUserNameSection;
        this.#addEnterEventListener();
    }

    #addEnterEventListener() {
        this.#element.addEventListener('keypress', (event) => {
            event.stopImmediatePropagation();
            if (event.key === "Enter") {
                this.#editUserNameSection.saveChangedButton.triggerClick();
            }
        })
    }

    value() {
        return this.#element.value;
    }
}