export const conversationTemplate = `
<li id="<%= conversation._id %>">
<a href="#">
<div class="d-flex">                            
<div class="chat-user-img online align-self-center me-3 ms-0">
<img src="/images/users/avatar-2.jpg" class="rounded-circle avatar-xs" alt="">
<span class="user-status"></span>
</div>

<div class="flex-1 overflow-hidden">
<h5 class="text-truncate font-size-15 mb-1"><%= conversation.name %></h5>
<p class="chat-user-message text-truncate mb-0"> Latest comment</p>
</div>
<div class="font-size-11">Latest comment time</div>
</div>
</a>
</li>`

export const chatLineTemplate = `
<div class="conversation-list">

    <%- chatAvatarHTML %>

    <div class="user-chat-content">
        <div class="ctext-wrap">
            <div class="ctext-wrap-content">
                <p class="mb-0">
                    <%= chatLine.content %>
                </p>
                <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i> <span class="align-middle"><%= chatLine.timestamp %></span></p>
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

export const chatAvatarTemplate = `
<div class="chat-avatar">
<img src="<%= user.avatar %>" alt="">
</div>`

export const chatUserTemplate = `
<div class="conversation-name"><%= user.title %></div>
`

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
</ul>
`

