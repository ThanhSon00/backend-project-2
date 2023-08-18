import { getConversationHTML } from "../../views/home.js";
import ConversationData from "../data/Conversation.js";
import User from "../data/User.js"
import ChatHeader from "./ChatHeader.js";
import ChatLineBox from "./ChatLineBox.js";
import ChatLineInput from "./ChatLineInput.js";
import ConversationList from "./ConversationList.js";
import SendChatLineBtn from "./SendChatLineBtn.js";

export default class Conversation {
    static chatLineBox;
    #chatLines;
    #members;
    #isGroup;
    #avatar;
    #normalInfo;
    #element;
    #user;
    #conversationData;
    #lastSeenChatLine;
    #conversationList;
    #latestChatLine;

    constructor(conversationData, conversationList) {
        if (!(conversationData instanceof ConversationData)) throw new Error("Must be conversation data");
        if (!(conversationList instanceof ConversationList)) throw new Error("Must be conversation list type");

        this.#lastSeenChatLine = conversationData.lastSeenChatLine;
        this.#conversationList = conversationList;
        this.#conversationData = conversationData;
        this.#user = conversationList.user;
        this.#conversationData.component = this;
    }

    static async createdFrom(conversationData, conversationList) {
        const conversation = new Conversation(conversationData, conversationList);
        await conversation.#createElement();
        return conversation;
    }

    async #createElement() {
        if (this.#element) return;
        await this.#loadLatestChatLine();
        const conversationElement = document.createElement('li');
        const conversationHTML = getConversationHTML(this.#conversationData);
        conversationElement.id = this.#conversationData._id;
        conversationElement.innerHTML = conversationHTML;
        this.#element = conversationElement;
        this.updateStatus(this.#latestChatLine);
        this.#addClickEventHandler();
        this.#user.loadSocketOnConversation(this);
    }

    async #loadLatestChatLine() {
        const response1 = await fetch(`/api/v1/conversations/${this.#conversationData._id}/chat-lines?sort_by=-timestamp&limit=1`);
        if (!response1.ok) return;
        const chatLines = await response1.json();
        this.#latestChatLine = chatLines[0];
        
        const response2 = await fetch(`/api/v1/users/${this.#latestChatLine.userID}`);
        const user = await response2.json();
        this.#latestChatLine.user = user;
    }

    updateStatus(latestChatLine) {
        this.#updateOnlineStatus();
        if (!latestChatLine) return;
        this.#latestChatLine = latestChatLine;
        this.#changeLatestChatLine(latestChatLine);
        this.#changeTimeDifference(latestChatLine);
    }

    #updateOnlineStatus() {
        const userStatus = document.createElement('span');
        userStatus.className = 'user-status';
        if (this.#conversationData.isOnline) {
            this.#element.querySelector('span').className = 'user-status';    
        } else this.#element.querySelector('span').className = '';    

    }

    #changeLatestChatLine(latestChatLine) {
        if (!latestChatLine) return;
        const userIsSender = this.#latestChatLine.user._id === this.#user._id; 
        const senderName = (userIsSender) ? 'You' : this.#latestChatLine.user.normalInfo.title;
        this.#element.querySelector('.chat-user-message.text-truncate.mb-0').innerText = `${senderName}: ${this.#latestChatLine.content}`;
    }

    #changeTimeDifference(latestChatLine) {
        if (!latestChatLine) return;
        const chatLineDate = latestChatLine.timestamp;
        this.#element.querySelector('.font-size-11').innerText = this.#getDifferenceTimeStr(chatLineDate);
    }

    #getDifferenceTimeStr(dateStr) {
        const now = new Date();
        const pastTime = new Date(dateStr);
        const timeDifferenceInMilliseconds = now - pastTime;
        const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000;
        const timeDifferenceInMinutes = timeDifferenceInSeconds / 60;
        const timeDifferenceInHours = timeDifferenceInMinutes / 60;
        const timeDifferenceInDays = timeDifferenceInHours / 24;

        if (timeDifferenceInDays >= 7) {
            return this.#formatDateToString(pastTime);
        }
        if (timeDifferenceInDays >= 2) {
            return `${Math.floor(timeDifferenceInDays)} days`;
        }
        if (timeDifferenceInDays >= 1) {
            return `yesterday`;
        }
        if (timeDifferenceInHours >= 1) {
            return `${Math.floor(timeDifferenceInHours)} hours`;
        }
        if (timeDifferenceInMinutes >= 1) {
            return `${Math.floor(timeDifferenceInMinutes)} minutes`;
        }
        return 'now';
    }

    #formatDateToString(date) {
        const day = date.getDate().toString().padStart(2, '0'); // Get day and ensure two-digit format
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month (0-indexed) and ensure two-digit format
        return `${day}/${month}`;
    }

    #addClickEventHandler() {
        this.#element.addEventListener('click', (event) => {
            const user = this.#user;
            if (!Conversation.chatLineBox) {
                Conversation.chatLineBox = new ChatLineBox(this, user);
            } else Conversation.chatLineBox.changeConversation(this);
            const chatLineBox = Conversation.chatLineBox;
            const chatLineInput = new ChatLineInput(chatLineBox);
            const sendChatLineBtn = new SendChatLineBtn(chatLineInput, chatLineBox);
            const chatHeader = new ChatHeader(this.#conversationData);

            this.active = true;
            this.#moveToBottom();
        })
    }

    #moveToBottom() {
        const simpleBar = document.querySelectorAll('.simplebar-content-wrapper')[6];
        simpleBar.scrollTop = simpleBar.scrollHeight;
    }

    async loadAndGetChatLines() {
        const response = await fetch(`/api/v1/conversations/${this.#conversationData._id}/chat-lines`);
        if (!response.ok) return;
        const chatLines = await response.json();
        this.#chatLines = chatLines;
        return this.#chatLines;
    }

    async loadAndGetMembers() {
        const response = await fetch(`/api/v1/conversations/${this.#conversationData._id}/users`);
        const users = await response.json();
        const members = [];
        users.forEach((user) => members.push(new User(user)))
        this.#members = members;
        return this.#members;
    }

    set active(value) {
        if (value === true) {
            for (const component of this.#conversationList.components) {
                if (!(component instanceof Conversation)) throw new Error("Must be conversation component type");
                if (component.#element.classList.contains('active')) {
                    fetch(`/api/v1/users/${component.#user._id}/conversations/${component._id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ lastSeenChatLine: component.#lastSeenChatLine._id })
                    })
                    component.#element.classList.remove('active');
                }
            }
            this.#element.classList.add('active');
        } else if (value === false) {
            this.#element.classList.remove('active');
        }
    }

    get _id() {
        return this.#conversationData._id;
    }

    get members() {
        return this.#members;
    }

    get chatLines() {
        return this.#chatLines;
    }

    get element() {
        return this.#element;
    }

    get isGroup() {
        return this.#normalInfo.isGroup;
    }
    
    get lastSeenChatLine() {
        return this.#conversationData.lastSeenChatLine;
    }
    
    get normalInfo() {
        return this.#conversationData.normalInfo;
    }
    

    get user() {
        return this.#user;
    }

    set name(name) {
        this.#conversationData.normalInfo.name = name;
    }

    set lastSeenChatLine(value) {
        this.#lastSeenChatLine = value;
    }
}
