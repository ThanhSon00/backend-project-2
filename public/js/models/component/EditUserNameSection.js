import NameEditBox from "./NameEditBox.js";
import SaveChangedButton from "./SaveChangedButton.js";
import SettingEditButton from "./SettingEditButton.js";

export default class EditUserNameSection {
    #user;
    #settingEditButton;
    #selectors;
    #element;
    #nameEditBox;
    #saveChangedButton;

    constructor(user, settingEditButton) {
        if (!(settingEditButton instanceof SettingEditButton)) throw new Error("Must be SettingEditButton type");

        this.#user = user;
        this.#settingEditButton = settingEditButton;
        this.#selectors = '#edit-user-name';
        this.#element = document.querySelector(this.#selectors);
        this.#nameEditBox = new NameEditBox(this);
        this.#saveChangedButton = new SaveChangedButton(this);    
        this.showSection();
    }

    showSection() {
        this.#element.classList.remove('visually-hidden');
        this.#settingEditButton.hidden();
    }

    hideSection() {
        this.#element.classList.add('visually-hidden');       
        this.#settingEditButton.show();
    }

    get user() {
        return this.#user;
    }

    get settingEditButton() {
        return this.#settingEditButton;
    }

    get SaveChangedButton() {
        return this.#saveChangedButton;
    }

    get nameEditBox() {
        return this.#nameEditBox;
    }
}