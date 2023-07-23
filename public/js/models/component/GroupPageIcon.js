import GroupPage from "./GroupPage.js";

export default class GroupPageIcon {
    #selectors;
    #element;
    #user;
    
    constructor(user) {
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