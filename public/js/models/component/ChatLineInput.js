import ChatLineBox from "./ChatLineBox.js";

export default class ChatLineInput {
    #selectors
    #element
    #chatLineBox

    constructor(chatLineBox) {
        if (!(chatLineBox instanceof ChatLineBox)) throw new Error("Must be ChatLineBox type");
        this.#chatLineBox = chatLineBox;
        this.#selectors = `.form-control.form-control-lg.bg-light.border-light`;
        this.#element = document.querySelector(this.#selectors);
        this.#addEnterKeyEventHandler();
    }

    #addEnterKeyEventHandler() {
        this.#element.addEventListener('keypress', (event) => {
            event.stopImmediatePropagation();
            if (event.key == "Enter") {
                event.stopImmediatePropagation();
                const userID = this.#chatLineBox.user._id;
                const content = this.content;
                const timestamp = this.#getTimestamp();

                if (!content) return;

                const chatLineObj = { userID, content, timestamp, user: this.#chatLineBox.user };
                const conversationID = this.#chatLineBox.conversation._id;
                fetch(`/api/v1/conversations/${conversationID}/chat-lines`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(chatLineObj)
                }).then((response) => {
                    this.#chatLineBox.displayChatLine(chatLineObj);
                    this.eraseContent();

                    const simpleBar = document.querySelectorAll('.simplebar-content-wrapper')[6];
                    simpleBar.scrollTop = simpleBar.scrollHeight;
                })
            }
        })
    }

    #getTimestamp() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const timestamp = `${currentHour}:${currentMinute}`;
        return timestamp;
    }

    eraseContent() {
        this.#element.value = "";
        this.#element.dispatchEvent(new Event('click'));
    }

    get element() {
        return this.#element;
    }

    get content() {
        return this.#element.value;
    }

    set content(value) {
        this.#element.value = value;
    }
}