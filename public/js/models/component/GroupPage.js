import CreateGroupIcon from "./CreateGroupIcon.js";

export default class GroupPage {
    #user;
    constructor(user) {
        this.#user = user;
        new CreateGroupIcon(user);
    }
}