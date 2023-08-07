import CreateGroupIcon from "./CreateGroupIcon.js";
import User from "../data/User.js"
export default class GroupPage {
    #user;
    constructor(user) {
        if (!(user instanceof User)) throw new Error("Must be User type");
  
        this.#user = user;
        new CreateGroupIcon(user);
    }
}