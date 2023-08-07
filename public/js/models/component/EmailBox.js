export default class EmailBox {
    #element 
    static #selectors = '#addcontactemail-input';
    constructor () {
        this.#element = document.querySelector(EmailBox.#selectors);
    }    

    get value() {
        return this.#element.value;
    }
}