import User from "../data/User.js";
import ChatPageIcon from "./ChatPageIcon.js";
import ConversationList from "./ConversationList.js";
import OwlStage from "./OwlStage.js";

export default class ChatPage {
    #conversationList;
    #user;
    #owlStage;

    constructor(user) {
        if (!(user instanceof User)) throw new Error("Must be user type");
        this.#user = user;
        this.#owlStage = new OwlStage(user); 
        this.#conversationList = ConversationList.createdFrom(user);  
    }

    static createdFrom(user) {
        const chatPage = new ChatPage(user);
        chatPage.#conversationList = ConversationList.createdFrom(user);
        return chatPage;
    }

    display() {
        new ChatPageIcon        
    }

    get conversationList() {
        return this.#conversationList;
    }
}