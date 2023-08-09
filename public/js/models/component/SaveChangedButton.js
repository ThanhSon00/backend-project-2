import EditUserNameSection from "./EditUserNameSection.js";
import NameBox from "./NameBox.js";

export default class SaveChangedButton {
    #selectors
    #element
    #editUserNameSection

    constructor(editUserNameSection) {
        if (!(editUserNameSection instanceof EditUserNameSection)) throw new Error("Must be Edit User")

        this.#editUserNameSection = editUserNameSection;
        this.#selectors = "#receiverSave";
        this.#element = document.querySelector(this.#selectors);
        this.#addClickEventListener();
    }

    #addClickEventListener() {
        this.#element.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            this.#clickEventHandler();
        })
    }

    async #clickEventHandler() {
        const user = this.#editUserNameSection.user;
        const newTitle = this.#editUserNameSection.nameEditBox.value();
        const updatedUser = { 'normalInfo.title': newTitle }
        const response = await fetch(`/api/v1/users/${user._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedUser)
        });

        if (response.ok) {
            this.#editUserNameSection.user.title = newTitle;
            this.#editUserNameSection.hideSection();
            this.#editUserNameSection.settingEditButton.nameBox.show(newTitle);        
            await fetch(`/authentication/refresh`, {
                method: "GET",
                credentials: "include",
            })
        }
    }

    triggerClick() {
        this.#element.dispatchEvent(new Event('click'));
    }
}