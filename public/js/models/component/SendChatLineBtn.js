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
        this.#addClickEventHandler();   
    }
    
    #addClickEventHandler() {
        this.#element.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            const userID = this.#chatLineBox.user._id;
            const content = this.#chatLineInput.content;
            const timestamp = this.#getTimestamp();

            if (!content) return;

            const chatLineObj = { userID, content, timestamp, user: this.#chatLineBox.user };
            const conversationID = this.#chatLineBox.conversation._id;
            fetch(`/api/v1/conversations/${conversationID}/chat-lines`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chatLineObj)
            }).then((response) => {
                this.#chatLineBox.displayChatLine(chatLineObj);
                this.#chatLineInput.eraseContent();
                
                const simpleBar = document.querySelectorAll('.simplebar-content-wrapper')[6];
                simpleBar.scrollTop = simpleBar.scrollHeight;
            })   
        })
    }

    #getTimestamp() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const timestamp = `${currentHour}:${currentMinute}`;
        return timestamp;
    }

    get element() {
        return this.#element;
    }
}