export default class DescriptionTextBox {
    #selectors;
    #element;
    constructor() {
        this.#selectors = "#addgroupdescription-input";
        this.#element = document.querySelector(this.#selectors);
    }

    get value() {
        return this.#element.value;
    }
}