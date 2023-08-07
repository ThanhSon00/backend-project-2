import EmailBox from "./EmailBox.js";
import User from "../data/User.js"

export default class SendFriendRequestBtn {
    #user
    #emailBox
    #selectors 
    #element
    
    constructor(user, emailBox) {
        if (!(user instanceof User)) throw new Error("Must be User type");
        if (!(emailBox instanceof EmailBox)) throw new Error("Must be Email Box type");
       
        this.#user = user;
        this.#emailBox = emailBox;
        this.#selectors = '#invite-contact-btn';
        this.#element = document.querySelector(this.#selectors);
        this.#addClickEventListener();
    }

    #addClickEventListener() {
        this.#element.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            this.clickEventHandler();
        })
    } 

    async clickEventHandler() {
        const email = this.#emailBox.value;
        const user = this.#user; 
        const notification = document.querySelector('.modal-body.p-4 h7');
        const getUsersResponse = await fetch(`/api/v1/users?normalInfo.email=${email}`); 
        
        if (!getUsersResponse.ok) {
            notification.className = "error";
            notification.innerText = await getUsersResponse.text();
            return;
        }

        const friends = await getUsersResponse.json();
        const friend = friends[0];
        const getUserFriendsResponse = await fetch(`/api/v1/users/${user._id}/friends`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(friend)
        });

        if (getUserFriendsResponse.ok) {
            notification.className = "notification";
            notification.innerText = "Friend request has been sent.";
        } else {
            notification.className = "error";
            notification.innerText = await getUserFriendsResponse.text();    
        }        
    }
}