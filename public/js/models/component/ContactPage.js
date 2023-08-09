import FriendRequestIcon from "./FriendRequestIcon.js";
import User from "../data/User.js";

export default class ContactPage {
    #friendRequestIcon;
    #user;

    constructor (user) {
        if (!(user instanceof User)) throw new Error("Must be user type");
   
        this.#user = user;
        this.#friendRequestIcon = new FriendRequestIcon(user);
    }
}