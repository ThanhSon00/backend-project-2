import ChatPage from "./ChatPage.js";
import ChatPageIcon from "./ChatPageIcon.js";
import CreateGroupForm from "./CreateGroupForm.js";

export default class CreateGroupButton {
    #selectors;
    #element;
    #createGroupForm;

    constructor(createGroupForm) {
        if (!(createGroupForm instanceof CreateGroupForm)) throw new Error("Must be create group form instance");
     
        this.#selectors = "#create-group-button";
        this.#element = document.querySelector(this.#selectors);
        this.#createGroupForm = createGroupForm;
        this.#addClickEventListener();
    }

    #addClickEventListener() {
        this.#element.addEventListener('click', async (event) => {
            event.stopImmediatePropagation();
            const conversation = await this.#sendRequest();
            this.#createGroupForm.close();
            await this.#redirectToConversation(conversation._id);           
        })
    }

    async #sendRequest() {
        const groupMembersCheckBox = this.#createGroupForm.groupMembersCheckBox;
        const groupNameTextBox = this.#createGroupForm.groupNameTextBox;
        const descriptionTextBox = this.#createGroupForm.descriptionTextBox;
        const user = this.#createGroupForm.user;
        
        const conversationName = groupNameTextBox.value;
        const members = groupMembersCheckBox.getCheckedFriend();
        const description = descriptionTextBox.value;
        const normalInfo = { name: conversationName }

        members.push(user.toObject());

        const response = await fetch(`/api/v1/conversations/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ normalInfo, description, members })
        });

        if (!response.ok) throw new Error('Something went wrong');
        return await response.json();
    }

    async #redirectToConversation(id) {
        const user = this.#createGroupForm.user;
        const chatPage = new ChatPage(user);
        (await chatPage.conversationList).open(id);

        // const chatPageIcon = new ChatPageIcon(user);
        // const chatPage = await chatPageIcon.loadChatPage();
        // const conversationList = chatPage.conversationList;

        // chatPageIcon.triggerClickEvent();
        // conversationList.open(id);
    }
}