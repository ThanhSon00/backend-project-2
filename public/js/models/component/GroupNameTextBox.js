export default class GroupNameTextBox {
    #selectors;
    #element;
    constructor() {
        this.#selectors = "#addgroupname-input";
        this.#element = document.querySelector(this.#selectors);
    }

    get value() {
        return this.#element.value;
    }
}