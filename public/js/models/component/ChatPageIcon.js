import ChatPage from "./ChatPage.js";

export default class ChatPageIcon {
    #selectors;
    #element;
    #user;
    #chatPage;

    constructor(user) {
        this.#user = user;
        this.#selectors = "#pills-chat-tab";
        this.#element = document.querySelector(this.#selectors);
        this.#addClickEventListener();
    }

    #addClickEventListener() {
        this.#element.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            this.loadChatPage();
        })
    }

    loadChatPage() {
        this.#chatPage = new ChatPage(this.#user);
        return this.#chatPage;
    }

    triggerClickEvent() {
        this.#element.dispatchEvent(new Event('click'));
    }

    get chatPage() {
        return this.#chatPage;
    }
}