import User from "../data/User.js";
import EmailBox from "./EmailBox.js";
import SendFriendRequestBtn from "./SendFriendRequestBtn.js";

export default class FriendRequestForm {
    #emailBox
    #sendFriendRequestBtn
    #user

    constructor (user) {
        if (!(user instanceof User)) throw new Error("Must be user type");

        this.#user = user;
        this.#emailBox = new EmailBox();
        this.#sendFriendRequestBtn = new SendFriendRequestBtn(user, this.#emailBox);   
    }
}