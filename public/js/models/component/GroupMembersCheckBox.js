import { friendGroupTemplate } from "../../views/home.js";
import User from "../data/User.js"

export default class GroupMembersCheckBox {
    #selectors;
    #element;
    #user;
    constructor(user) {
        if (!(user instanceof User)) throw new Error("Must be User type");
  
        this.#user = user;
        this.#selectors = "#friend-list";
        this.#element = document.querySelector(this.#selectors);
        this.#loadFriendList();
    }

    async #loadFriendList() {
        const response = await fetch(`/api/v1/users/${this.#user._id}/friends`);
        const friends = await response.json();
        const sortedFriends = this.#groupFriendsByFirstCharacter(friends);
        this.#element.querySelector('.simplebar-content').innerHTML = "";           
        
        for (let i = 0; i < sortedFriends.length; i++) {
            const friendGroupHTML = ejs.render(friendGroupTemplate, {
                firstChar: sortedFriends[i].firstChar,
                friends: sortedFriends[i].friends,
            });
            const friendGroupElement = document.createElement('div');
            friendGroupElement.innerHTML = friendGroupHTML;
            this.#element.querySelector('.simplebar-content').append(friendGroupElement);           
        } 
    }

    getCheckedFriend() {
        const friends = [];
        const friendList = this.#element.querySelectorAll('li');

        friendList.forEach((friendListItem) => {
            if (friendListItem.querySelector('.form-check-input').checked) {
                const friend = this.#getFriendDataFrom(friendListItem);
                friends.push(friend);
            }
        })

        return friends;
    }

    #getFriendDataFrom(friendListItem) {
        if (!(friendListItem instanceof HTMLLIElement)) throw new Error('Arg must be HTMLLIElement');

        return {
            _id: friendListItem.id,
            normalInfo: {
                name: friendListItem.querySelector("#name").value,
                avatar: friendListItem.querySelector('#avatar').value,
                title: friendListItem.querySelector('#title').value,    
                email: friendListItem.querySelector('#email').value,
            }
        }
    }

    #groupFriendsByFirstCharacter(friends) {
        const result = {};
        for (const friend of friends) {
            const firstChar = friend.normalInfo.title.charAt(0).toUpperCase();

            if (result[firstChar]) {
                result[firstChar].friends.push(friend);
            } else {
                result[firstChar] = {
                    firstChar: firstChar,
                    friends: [friend]
                };
            }
        }
        return Object.values(result);
    }
}