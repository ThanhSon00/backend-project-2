import User from "../data/User.js";
import ChatPage from "./ChatPage.js";

export default class ChatPageIcon {
    #selectors;
    #element;
    #user;
    #chatPage;

    constructor(user) {
        if (!(user instanceof User)) throw new Error("Must be user type");

        this.#user = user;
        this.#selectors = "#pills-chat-tab";
        this.#element = document.querySelector(this.#selectors);
        this.#addClickEventListener();
    }

    #addClickEventListener() {
        this.#element.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            this.#chatPage ||= new ChatPage(this.#user);
        })
    }

    loadChatPage() {
        this.#chatPage = ChatPage.createdFrom(this.#user);
        return this.#chatPage;
    }

    triggerClickEvent() {
        this.#element.dispatchEvent(new Event('click'));
    }

    get chatPage() {
        return this.#chatPage;
    }
}