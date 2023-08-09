import User from "../data/User.js";
import OwlItem from "./OwlItem.js";

export default class OwlStage {
    #selectors;
    #element;
    #user;
    #currentItemStyle;
    
    constructor(user) {
        if (!(user instanceof User)) throw new Error('Must be user type');

        this.#selectors = '.owl-stage';
        this.#element = document.querySelector(this.#selectors);
        this.#user = user;
        this.#currentItemStyle = this.#element.querySelector('.owl-item.active').getAttribute('style');
        this.#onLoad();
    }   

    async #onLoad() {
        await this.#user.loadFriends();
        this.#element.innerHTML = "";
        this.#user.friends.forEach(friend => {
            const owlItem = new OwlItem(this.#user, new User(friend), this.#currentItemStyle);
            this.#element.appendChild(owlItem.element);
        })  
    }
}