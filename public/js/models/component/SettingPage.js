import { getAvatarHTML } from "../../views/home.js";
import User from "../data/User.js"
import NameBox from "./NameBox.js";
import ProfileImageInput from "./ProfileImageInput.js";
import SettingEditButton from "./SettingEditButton.js";

export default class SettingPage {
    #user
    #nameBox
    #settingEditButton
    #profileImageInput
    #profileImageElement

    constructor(user) {
        if (!(user instanceof User)) throw new Error("Must be User type");
    
        this.#user = user;
        this.#nameBox = new NameBox(this.#user);
        this.#settingEditButton = new SettingEditButton(this.#user, this.#nameBox);    
        this.#profileImageInput = new ProfileImageInput();
        this.#profileImageElement = document.querySelector('#profile-image');
        this.#profileImageElement.innerHTML = getAvatarHTML(this.#user.normalInfo.title, this.#user.normalInfo.avatar);
        this.#profileImageElement.querySelector('.avatar-xs').className = 'avatar-lg rounded-circle';
    }

    get nameBox() {
        return this.#nameBox;
    }

    get SettingEditButton() {
        return this.#settingEditButton;
    }
}