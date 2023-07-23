import ConversationModel from "./Conversation.js";

export default class User {
    #_id;
    #name;
    #avatar;
    #title;
    #email;
    #conversations;
    #onlineConversationID;

    constructor(user) {
        this.#_id = user._id;
        this.#name = user.normalInfo.name;      
        this.#avatar = user.normalInfo.avatar;
        this.#title = user.normalInfo.title;
        this.#email = user.normalInfo.email;
    }

    static async createdFromSession() {
        const originURL = window.location.origin;
        const response = await fetch(`${originURL}/whoami`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            const credential = await response.json();
            return new User(credential);
        } else throw new Error('User Credential not found');
    }

    async loadConversations() {
        if (!this.#conversations) { 
            const response = await fetch(`${window.location.origin}/api/v1/users/${this.#_id}/conversations`);
            this.#conversations = await response.json();
        }
    }
    
    toObject() {
        return {
            _id: this.#_id,
            normalInfo: {
                name: this.#name,
                avatar: this.#avatar,
                title: this.#title,
                email: this.#email,
            }
        }
    }

    get _id() {
        return this.#_id;
    }

    get conversations() {
        return this.#conversations;
    }

    get avatar() {
        return this.#avatar;
    }

    get title() {
        return this.#title;
    }
}