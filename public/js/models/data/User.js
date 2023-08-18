import ConversationData from "./Conversation.js";
import Conversation from "../component/Conversation.js";

export default class User {
    #_id;
    #normalInfo;
    #friends;
    #conversations;

    #name;
    #avatar;
    #title;
    #email;
    #onlineConversationID;
    #lock;
    #socket;

    constructor(user) {
        this.#normalInfo = user.normalInfo;
        this.#_id = user._id;
        this.#name = user.normalInfo.name;
        this.#avatar = user.normalInfo.avatar;
        this.#title = user.normalInfo.title;
        this.#email = user.normalInfo.email;
        this.#lock = false;
        this.#conversations = [];
        this.#friends = user.friends;
        this.#resizeAvatar();
        user.conversations?.forEach(conversation => 
            this.#conversations.push(new ConversationData(conversation))
        );
    }

    #resizeAvatar() {
        if (!this.#avatar && !this.#normalInfo.avatar) return;
        const names = this.#avatar.split('/');
        const imageVersionAndName = `${names[names.length - 2]}/${names[names.length - 1]}`;
        this.#avatar = `https://res.cloudinary.com/dfnm6sooi/image/upload/c_fill,h_200,w_200/${imageVersionAndName}`;
        this.#normalInfo.avatar = this.#avatar;
    }

    static async createdFromSession() {
        const response = await fetch(`/whoami`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            const credential = await response.json();
            const user = new User(credential);

            user.#launchSocket();
            user.#socket.emit(`user enter page`, credential);
            return user;
        } else throw new Error('User Credential not found');
    }

    #launchSocket() {
        this.#socket = io(window.location.host, {
            query: { userID: this.#_id }
        });
        this.#socket.on(`your friend is online`, (friend) => {
            this.#setStatus(friend, true);
            this.#socket.emit(`send your status to friends`, this);
        });
        this.#socket.on(`user receive friend status`, (friend) => {
            this.#setStatus(friend, true);
        })
        this.#socket.on(`your friend has been offline`, (friend) => {
            console.log('Your friend has been offline');
            this.#setStatus(friend, false);
        })
    }

    #setStatus(friend, onlineStatus) {
        this.setConversationOnlineStatus(friend._id, onlineStatus);
        this.setFriendOnlineStatus(friend._id, onlineStatus);
    }

    setConversationOnlineStatus(friendID, onlineStatus) {
        this.#conversations.find(conversation => {
            return (!conversation.normalInfo.isGroup && conversation.members.some(member => member._id === friendID));
        }).isOnline = onlineStatus;
    }

    setFriendOnlineStatus(friendID, onlineStatus) {
        const friend = this.#friends.find(friend => friend._id === friendID);
        friend.isOnline = onlineStatus;
        friend.owlItem?.updateStatus();

    }

    loadSocketOnConversation(conversationComponent) {
        if (!(conversationComponent instanceof Conversation)) throw new Error("Must be conversation component type");

        this.#socket.on(`conversation receive chatLine`, (chatLine) => {
            conversationComponent.updateStatus(chatLine);
            const chatLineBox = Conversation.chatLineBox;
            if (chatLineBox?.conversation._id === conversationComponent._id) {
                chatLineBox.displayChatLine(chatLine);
                conversationComponent.lastSeenChatLine = chatLine;
            }
        })
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

    toJSON() {
        return {
            _id: this.#_id,
            normalInfo: this.#normalInfo,
        }
    }

    sendMessage(chatLine) {
        this.#socket.emit('send chatLine to server', chatLine);
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

    get socket() {
        return this.#socket;
    }
}