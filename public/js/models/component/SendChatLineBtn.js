import ChatLine from "./ChatLine.js";
import ChatLineBox from "./ChatLineBox.js";
import ChatLineInput from "./ChatLineInput.js";

export default class SendChatLineBtn {
    #chatLineInput
    #chatLineBox
    #element
    #selectors
    #user

    constructor(chatLineInput, chatLineBox) {
        if (!(chatLineBox instanceof ChatLineBox)) throw Error("Must be ChatLineBox type");
        if (!(chatLineInput instanceof ChatLineInput)) throw Error("Must be ChatLineInput type");

        this.#chatLineBox = chatLineBox;
        this.#chatLineInput = chatLineInput;
        this.#selectors = ".btn.btn-primary.font-size-16.btn-lg.chat-send.waves-effect.waves-light";
        this.#element = document.querySelector(this.#selectors);
        this.#user = chatLineBox.user;

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
        const userID = this.#user._id;
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
            this.#user.sendMessage(chatLine);
            this.#chatLineBox.conversation.lastSeenChatLine = chatLine;
            this.#chatLineBox.conversation.updateStatus(chatLine);
            this.#chatLineBox.displayChatLine(chatLine);
            this.#chatLineInput.eraseContent();
        })
    }

    get element() {
        return this.#element;
    }
}