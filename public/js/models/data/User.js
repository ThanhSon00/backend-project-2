export default class User {
    #_id;
    #normalInfo;
    #friends;
    
    #name;
    #avatar;
    #title;
    #email;
    #conversations;
    #onlineConversationID;
    #lock;

    constructor(user) {
        this.#normalInfo = user.normalInfo;
        this.#_id = user._id;
        this.#name = user.normalInfo.name;      
        this.#avatar = user.normalInfo.avatar;
        this.#title = user.normalInfo.title;
        this.#email = user.normalInfo.email;
        this.#lock = false;
        this.#resizeAvatar();
    }

    #resizeAvatar() {
        if (!this.#avatar && !this.#normalInfo.avatar) return;
        const names = this.#avatar.split('/');
        const imageVersionAndName = `${names[names.length - 2]}/${names[names.length - 1]}`;
        this.#avatar = `https://res.cloudinary.com/dfnm6sooi/image/upload/c_fill,h_200,w_200/${imageVersionAndName}`;        
        this.#normalInfo.avatar = this.#avatar;
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
        while(this.#lock) { 
            await this.#delay(50); 
        }
        if (!this.#conversations) {
            this.#lock = true; 
            const response = await fetch(`/api/v1/users/${this.#_id}/conversations`);
            this.#conversations = await response.json();
            this.#lock = false;
        }
    }

    async loadFriends() {
        if (!this.#friends) {
            const response = await fetch(`/api/v1/users/${this.#_id}/friends`);
            this.#friends = await response.json();
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

    #delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
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

    set title(value) {
        this.#title = value;
    }

    get normalInfo() {
        return this.#normalInfo;
    }

    get friends() {
        return this.#friends;
    }
}