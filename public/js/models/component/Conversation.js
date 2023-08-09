import { getConversationHTML } from "../../views/home.js";
import User from "../data/User.js"
import ChatHeader from "./ChatHeader.js";
import ChatLineBox from "./ChatLineBox.js";
import ChatLineInput from "./ChatLineInput.js";
import SendChatLineBtn from "./SendChatLineBtn.js";

export default class Conversation {
    #_id;
    #name;
    #chatLines;
    #members;
    #isGroup;
    #latestChatLine;
    #avatar;
    #normalInfo;
    #element;
    #user;

    constructor(conversation, user) {
        if (!(user instanceof User)) throw new Error("Must be user type");

        this.#_id = conversation._id;
        this.#normalInfo = conversation.normalInfo;
        this.#user = user;
    }

    static async createdFrom(conversationData, user) {
        const conversation = new Conversation(conversationData, user);
        await conversation.#createElement();
        return conversation;
    }

    async #createElement() {
        await this.#loadLatestChatLine();
        const conversationElement = document.createElement('li');
        const conversationHTML = getConversationHTML(this);

        conversationElement.id = this.#_id;
        conversationElement.innerHTML = conversationHTML;
        this.#element = conversationElement;
        this.updateStatus(this.#latestChatLine);
        this.#addClickEventHandler();
    }

    async #loadLatestChatLine() {
        const response1 = await fetch(`/api/v1/conversations/${this.#_id}/chat-lines?sort_by=-timestamp&limit=1`);
        if (!response1.ok) return;
        const chatLines = await response1.json();
        this.#latestChatLine = chatLines[0];
        
        const response2 = await fetch(`/api/v1/users/${this.#latestChatLine.userID}`);
        const user = await response2.json();
        this.#latestChatLine.user = user;
    }

    updateStatus(latestChatLine) {
        if (!latestChatLine) return;
        this.#latestChatLine = latestChatLine;
        this.#changeLatestChatLine(latestChatLine);
        this.#changeTimeDifference(latestChatLine);
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
            const chatLineBox = new ChatLineBox(this, user);
            const chatLineInput = new ChatLineInput(chatLineBox);
            const sendChatLineBtn = new SendChatLineBtn(chatLineInput, chatLineBox);
            const chatHeader = new ChatHeader(this);

            const simpleBar = document.querySelectorAll('.simplebar-content-wrapper')[6];
            simpleBar.scrollTop = simpleBar.scrollHeight;
        })
    }

    async loadAndGetChatLines() {
        const response = await fetch(`/api/v1/conversations/${this.#_id}/chat-lines`);
        if (!response.ok) return;
        const chatLines = await response.json();
        this.#chatLines = chatLines;
        return this.#chatLines;
    }

    async loadAndGetMembers() {
        const response = await fetch(`/api/v1/conversations/${this.#_id}/users`);
        const users = await response.json();
        const members = [];
        users.forEach((user) => members.push(new User(user)))
        this.#members = members;
        return this.#members;
    }

    get _id() {
        return this.#_id;
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

    get name() {
        return this.#normalInfo.name;
    }

    get isGroup() {
        return this.#normalInfo.isGroup;
    }
    
    get latestChatLine() {
        return this.#latestChatLine;
    }
    
    get avatar() {
        return this.#normalInfo.avatar;
    }
    
    get normalInfo() {
        return this.#normalInfo;
    }

    get avatar() {
        return this.#normalInfo.avatar;
    }

    get user() {
        return this.#user;
    }

    set name(name) {
        this.#name = name;
    }
}
