import CloseFormButton from "./CloseFormButton.js";
import CreateGroupButton from "./CreateGroupButton.js";
import DescriptionTextBox from "./DescriptionTextBox.js";
import GroupMembersCheckBox from "./GroupMembersCheckBox.js";
import GroupNameTextBox from "./GroupNameTextBox.js";

export default class CreateGroupForm {
    #user;
    #groupNameTextBox;
    #groupMembersCheckBox;
    #descriptionTextBox;
    #createGroupButton;
    #closeFormButton;

    constructor(user) {
        this.#user = user;
        this.#groupNameTextBox = new GroupNameTextBox();
        this.#groupMembersCheckBox = new GroupMembersCheckBox(user); 
        this.#descriptionTextBox = new DescriptionTextBox();
        this.#closeFormButton = new CloseFormButton();
    }

    static generate(user) {
        const form = new CreateGroupForm(user);
        form.#createGroupButton = new CreateGroupButton(form);
        return form;
    }
    
    close() {
        this.#closeFormButton.triggerClickEvent();
    }   

    get user() {
        return this.#user;
    }

    get groupNameTextBox() {
        return this.#groupNameTextBox;
    }

    get descriptionTextBox() {
        return this.#descriptionTextBox;
    }

    get createGroupButton() {
        return this.#createGroupButton;
    }

    get groupMembersCheckBox() {
        return this.#groupMembersCheckBox;
    }

    get closeFormButton() {
        return this.#closeFormButton;
    }
}