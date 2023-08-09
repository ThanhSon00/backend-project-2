export default class ThemeIcon {
    #selectors;
    #element;
    #bootstrapStyle;
    constructor() {
        this.#selectors = "#light-dark";
        this.#element = document.querySelector(this.#selectors);
        this.#bootstrapStyle = document.querySelector("#bootstrap-style");
        this.#addClickEventListener();
    }

    #addClickEventListener() {
        this.#element.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            if (this.#darkModeDisabled()) {
                this.#enableDarkMode();
            } else {
                this.#disableDarkMode();
            }
        })
    }

    #darkModeDisabled() {
        return this.#bootstrapStyle.getAttribute("disabled") !== "disabled";
    }

    #enableDarkMode() {
        document.querySelector('#bootstrap-style').setAttribute("disabled", "disabled");
        document.querySelector('#app-style').setAttribute("disabled", "disabled");
        localStorage.setItem('dark-mode', 'enabled');
    }

    #disableDarkMode() {
        document.querySelector('#bootstrap-style').removeAttribute("disabled");
        document.querySelector('#app-style').removeAttribute("disabled");
        localStorage.setItem('dark-mode', 'disabled');
    }

    triggerClickEvent() {
        this.#element.dispatchEvent(new Event('click'));
    }
}