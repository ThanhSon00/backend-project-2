import Conversation from "../component/Conversation.js";

export default class ConversationData {
    #_id;
    #normalInfo;
    #chatLines;
    #members;
    #description;
    #isOnline;
    #component;
    #lastSeenChatLine;

    constructor(userConversation) {
        this.#_id = userConversation._id;
        this.#normalInfo = userConversation.normalInfo;
        this.#chatLines = userConversation.chatLines;
        this.#members = userConversation.members;
        this.#description = userConversation.description;
        this.#lastSeenChatLine = userConversation.lastSeenChatLine;
    }

    set isOnline(value) {
        this.#isOnline = value;
        this.#component?.updateStatus();
    }

    get _id() {
        return this.#_id;
    }

    get normalInfo() {
        return this.#normalInfo;
    }

    get chatLines() {
        return this.#chatLines;
    }

    get description() {
        return this.#description;
    }

    get isOnline() {
        return this.#isOnline;
    }

    get component() {
        return this.#component;
    }

    get members() {
        return this.#members;
    }

    get lastSeenChatLine() {
        return this.#lastSeenChatLine;
    }

    set component(value) {
        if (!(value instanceof Conversation)) throw new Error("Must be conversation component type");
        this.#component = value;
    }
}