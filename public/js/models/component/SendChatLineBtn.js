import ChatLine from "./ChatLine.js";
import ChatLineBox from "./ChatLineBox.js";
import ChatLineInput from "./ChatLineInput.js";

export default class SendChatLineBtn {
    #chatLineInput
    #chatLineBox
    #element
    #selectors

    constructor(chatLineInput, chatLineBox) {
        if (!(chatLineBox instanceof ChatLineBox)) throw Error("Must be ChatLineBox type");
        if (!(chatLineInput instanceof ChatLineInput)) throw Error("Must be ChatLineInput type");

        this.#chatLineBox = chatLineBox;
        this.#chatLineInput = chatLineInput;
        this.#selectors = ".btn.btn-primary.font-size-16.btn-lg.chat-send.waves-effect.waves-light";
        this.#element = document.querySelector(this.#selectors);

        const newCloneElement = this.#element.cloneNode(true);
        this.#element.parentNode.replaceChild(newCloneElement, this.#element);
        this.#element = newCloneElement;
        this.#addClickEventListener();
    }

    #addClickEventListener() {
        this.#element.addEventListener('click', (event) => { 
            event.stopImmediatePropagation(); 
            this.#clickEventHandler(); 
        });
    }

    #clickEventHandler() {
        const userID = this.#chatLineBox.user._id;
        const content = this.#chatLineInput.content;

        if (!content) return;

        const chatLineObj = { userID, content };
        const conversationID = this.#chatLineBox.conversation._id;
        fetch(`/api/v1/conversations/${conversationID}/chat-lines`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chatLineObj)
        }).then(async (response) => {
            const chatLine = await response.json();

            chatLine.user = this.#chatLineBox.user;
            this.#chatLineBox.conversation.updateStatus(chatLine);
            this.#chatLineBox.displayChatLine(chatLine);

            this.#chatLineInput.eraseContent();

            const simpleBar = document.querySelectorAll('.simplebar-content-wrapper')[6];
            simpleBar.scrollTop = simpleBar.scrollHeight;
        })
    }

    get element() {
        return this.#element;
    }
}