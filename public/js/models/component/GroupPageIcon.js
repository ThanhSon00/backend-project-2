import GroupPage from "./GroupPage.js";
import User from "../data/User.js"

export default class GroupPageIcon {
    #selectors;
    #element;
    #user;
    
    constructor(user) {
        if (!(user instanceof User)) throw new Error("Must be User type");
  
        this.#user = user;
        this.#selectors = "#pills-groups-tab";
        this.#element = document.querySelector(this.#selectors);
        this.#addClickEventListener();
    }

    #addClickEventListener() {
        this.#element.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            this.#loadGroupPage();
        })
    }

    #loadGroupPage() {
        new GroupPage(this.#user);
    }
}