const chatButton = document.querySelector('.btn.btn-primary.font-size-16.btn-lg.chat-send.waves-effect.waves-light');
const messageInputBox = document.querySelector('#message-input-box');
const sendMessageAfterEnter = (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
};

function sendMessage() {
    const sender = getSender();
    const chatContent = getChatContent();
    const receiverID = getReceiverID();
    const contentIsValid = checkValid(chatContent);
    const chatHTML = createSenderChatHTML(sender, chatContent);
    if (contentIsValid) {
        saveChatLineToDatabase(sender, chatContent, receiverID);
        displayChat(chatHTML);
    } else {
        displayNotification();
    }
}

function getSender() {
    const sender = {};
    sender._id = document.querySelector(`button[type=submit]`).getAttribute('data-sender-id');
    sender.name = document.querySelector(`button[type=submit]`).getAttribute('data-sender-name');
    sender.avatar = document.querySelector(`button[type=submit]`).getAttribute('data-sender-avatar');
    return sender;
}

function getChatContent() {
    return document.querySelector('div.chat-input-section input').value;
}

function getReceiverID() {
    return document.querySelector(`button[type=submit]`).getAttribute('data-receiver-id');}

function checkValid(content) {
    if (content) return true;
    return false;
}

function createSenderChatHTML(sender, chatContent) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = `${currentHour}:${currentMinute}`;
    const htmlChat = ejs.render(userChatContent, { user: sender, chatContent, currentTime });
    const li = document.createElement('li');
    li.className = "right";
    li.innerHTML = htmlChat;
    return li;
}

function saveChatLineToDatabase(sender, chatContent, receiverID) {

}

function displayChat(chatHTML) {
    const chatList = document.querySelector('.list-unstyled.mb-0');
    const chatBox = document.querySelectorAll('.simplebar-content-wrapper')[6];
    const chatInput = document.querySelector('#message-input-box');
    chatList.appendChild(chatHTML);
    chatBox.scrollTop = chatBox.scrollHeight;
    chatInput.value = "";
    chatInput.dispatchEvent(new Event('click'));
}

function displayNotification() {
    
}

!function (a) { "use strict"; a(".dropdown-menu a.dropdown-toggle").on("click", function (t) { return a(this).next().hasClass("show") || a(this).parents(".dropdown-menu").first().find(".show").removeClass("show"), a(this).next(".dropdown-menu").toggleClass("show"), !1 }), a(function () { a('[data-toggle="tooltip"]').tooltip() }), a(function () { a('[data-toggle="popover"]').popover() }), a("#light-dark").on("click", function (t) { "disabled" !== a("#bootstrap-style").attr("disabled") ? (a("#bootstrap-dark-style").attr("disabled", !1), a("#bootstrap-style").attr("disabled", !0), a("#app-dark-style").attr("disabled", !1), a("#app-style").attr("disabled", !0)) : (a("#bootstrap-dark-style").attr("disabled", !0), a("#bootstrap-style").attr("disabled", !1), a("#app-dark-style").attr("disabled", !0), a("#app-style").attr("disabled", !1)) }), Waves.init() }(jQuery);


chatButton.addEventListener('click', sendMessage);
messageInputBox.addEventListener('keypress', sendMessageAfterEnter)
