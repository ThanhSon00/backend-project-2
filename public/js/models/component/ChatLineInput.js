import ChatLineBox from "./ChatLineBox.js";
import SendChatLineBtn from "./SendChatLineBtn.js";

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
                new SendChatLineBtn(this, this.#chatLineBox).element.dispatchEvent(new Event('click'));
            }
        })
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