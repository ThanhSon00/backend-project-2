export default class Conversation {
    #_id;
    #name;
    #members;
    #chatLines;

    constructor(conversation) {
        this.#_id = conversation._id;
        this.#name = conversation.name;
        this.#members = conversation.members;
        this.#chatLines = conversation.chatLines;
    } 

    static async getConversation(conversationID) {
		const originURL = window.location.origin;
        const response = await fetch(`${originURL}/api/v1/conversations/${conversationID}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		});
        if (response.ok) {
            const conversation = await response.json();
            return new Conversation(conversation);
        } 
    }
}
