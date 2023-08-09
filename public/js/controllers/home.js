! function(a) {
    "use strict";
    a(".dropdown-menu a.dropdown-toggle").on("click", function(t) {
        return a(this).next().hasClass("show") || a(this).parents(".dropdown-menu").first().find(".show").removeClass("show"), a(this).next(".dropdown-menu").toggleClass("show"), !1
    }), a(function() {
        a('[data-toggle="tooltip"]').tooltip()
    }), a(function() {
        a('[data-toggle="popover"]').popover()
    }), Waves.init()
}(jQuery);

import User from "../models/data/User.js";
import GroupPageIcon from "../models/component/GroupPageIcon.js";
import ChatPageIcon from "../models/component/ChatPageIcon.js";
import ContactPageIcon from "../models/component/ContactPageIcon.js";
import ThemeIcon from "../models/component/ThemeIcon.js";
import SettingIcon from "../models/component/SettingIcon.js"
import { getAvatarHTML } from "../views/home.js";

(async () => {
    const user = await User.createdFromSession();
    

    new ThemeIcon();
    new ChatPageIcon(user);
    new GroupPageIcon(user);
    new ContactPageIcon(user);
    new SettingIcon(user);    

    document.querySelectorAll('.nav-link.dropdown-toggle').forEach(element => {
        element.innerHTML = getAvatarHTML(user.normalInfo.title, user.normalInfo.avatar);
    })
}) ()
