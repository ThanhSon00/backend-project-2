import User from "../data/User.js"
export default class GroupList {
    #user;
    #selectors;
    #element;

    constructor(user) {
        if (!(user instanceof User)) throw new Error("Must be User type");
  
        this.#user = user;
        this.#selectors = "";
        this.#element = document.querySelector(this.#selectors);
        this.#loadGroupList();
    }

    #loadGroupList() {
        
    }
}