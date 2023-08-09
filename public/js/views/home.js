export const avatarTemplate = `
<% if (avatar) { %>
    <img src="<%= avatar %>" class="rounded-circle avatar-xs" alt="">
<% } else { %>
    <div class="avatar-xs">
        <span class="avatar-title rounded-circle bg-soft-primary text-primary">
            <%= name.charAt(0).toUpperCase() %>
        </span>
    </div>
<% } %>
`

export const getAvatarHTML = (name, avatar) => {
    return ejs.render(avatarTemplate, { name, avatar });
}

export const conversationTemplate = `
    <a href="#">
        <div class="d-flex">                            
            <div class="chat-user-img online align-self-center me-3 ms-0">
                <%- avatarHTML %>
                <span class="user-status"></span>
            </div>

        <div class="flex-1 overflow-hidden">
            <h5 class="text-truncate font-size-15 mb-1"><%= conversation.normalInfo.name %></h5>
            <p class="chat-user-message text-truncate mb-0"></p>
        </div>
        <div class="font-size-11"></div>
        </div>
    </a>`

export const getConversationHTML = (conversation) => {
    const avatarHTML = getAvatarHTML(conversation.normalInfo.name, conversation.normalInfo.avatar);
    const conversationHTML = ejs.render(conversationTemplate, { conversation, avatarHTML });
    return conversationHTML;
}

export const chatUserIdTemplate = `
<input class="user-id" type="hidden" value="<%= user._id %>">`

const getChatUserIdHTML = (user) => {
    const chatUserIdHTML = ejs.render(chatUserIdTemplate, { user });
    return chatUserIdHTML;
}

export const chatAvatarTemplate = `
<div class="chat-avatar">
<%- avatarHTML %>
</div>`

const getChatAvatarHTML = (user, chatLine) => {
    const avatarHTML = getAvatarHTML(user.normalInfo.title, user.normalInfo.avatar);
    const chatAvatarHTML = ejs.render(chatAvatarTemplate, { avatarHTML });
    return chatAvatarHTML;
}

export const chatUserTemplate = `
<div class="conversation-name"><%= user.title %></div>
`
const getChatUserHTML = (user) => {
    const chatUserHTML = ejs.render(chatUserTemplate, { user });
    return chatUserHTML;
}

export const chatLineTemplate = `
<div class="conversation-list">
    <%- chatUserIdHTML %>
    <%- chatAvatarHTML %>

    <div class="user-chat-content">
        <div class="ctext-wrap">
            <div class="ctext-wrap-content">
                <p class="mb-0">
                    <%= chatLine.content %>
                </p>
                <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i> <span class="align-middle"><%= new Date(chatLine.timestamp).toTimeString().split(' ')[0] %></span></p>
            </div>
            <div class="dropdown align-self-start">
                <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="ri-more-2-fill"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-end">
                    <a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a>
                    <a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a>
                    <a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a>
                    <a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a>
                </div>
            </div>
        </div>
        <%- chatUserHTML %>
    </div>
</div>`

export const getChatLineHTML = (user, chatLine) => {
    const chatUserIdHTML = getChatUserIdHTML(user);
    const chatAvatarHTML = getChatAvatarHTML(user);
    const chatUserHTML = getChatUserHTML(user);
    const chatLineHTML = ejs.render(chatLineTemplate, { chatLine, chatUserIdHTML, chatAvatarHTML, chatUserHTML });
    return chatLineHTML;
}

export const friendGroupTemplate = `
<div class="p-3 fw-bold text-primary">
    <%= firstChar %>
</div>

<ul class="list-unstyled contact-list">
    <% for (let i = 0; i < friends.length; i++) { %>
        <li id="<%= friends[i]._id %>">
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="<%= friends[i]._id %>">
                <label class="form-check-label" for="<%= friends[i]._id %>" id="title"> <%= friends[i].normalInfo.title %> </label>
                <input type="hidden" name="name" id="name" value="<%= friends[i].normalInfo.name %>">
                <input type="hidden" name="email" id="email" value="<%= friends[i].normalInfo.email %>">
                <input type="hidden" name="avatar" id="avatar" value="<%= friends[i].normalInfo.avatar %>"    
            </div>
        </li>
    <% } %>
</ul>`

export const owlItemTemplate = `
<div class="item">
    <a href="#" class="user-status-box">
        <div class="avatar-xs mx-auto d-block chat-user-img online">
            <%- avatarHTML %>
            <span class="user-status"></span>
        </div>

        <h5 class="font-size-13 text-truncate mt-3 mb-1"><%= friend.normalInfo.title %></h5>
    </a>
</div>`

export const getOwlItemHTML = (friend) => {
    const avatarHTML = getAvatarHTML(friend.normalInfo.title, friend.normalInfo.avatar);
    const owlItemHTML = ejs.render(owlItemTemplate, { avatarHTML, friend });
    return owlItemHTML;
}