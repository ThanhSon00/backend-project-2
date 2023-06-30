const userChatContent = `
<div class="conversation-list">
<div class="chat-avatar">
    <img src="<%= user.avatar %>" alt="">
</div>

<div class="user-chat-content">
    <div class="ctext-wrap">
        <div class="ctext-wrap-content">
            <p class="mb-0">
                <%= chatContent %>
            </p>
            <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i> <span class="align-middle"><%= currentTime %></span></p>
        </div>
        <div class="dropdown align-self-start">
            <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="ri-more-2-fill"></i>
            </a>
            <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a>
                <a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a>
                <a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a>
                <a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a>
            </div>
        </div>
    </div>
    <div class="conversation-name"><%= user.title %></div>
</div>
</div>`

