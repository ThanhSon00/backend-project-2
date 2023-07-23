export default class CloseFormButton {
    #selectors
    #element
    constructor() {
        this.#selectors = "#close-button-1";
        this.#element = document.querySelector(this.#selectors);
    }

    triggerClickEvent() {
        this.#element.dispatchEvent(new Event('click'));
    }
}