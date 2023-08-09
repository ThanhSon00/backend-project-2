export default class ProfileImageInput {
    #selectors;
    #element;
    #profileImageDisplay;

    constructor() {
        this.#selectors = "#image-file-input";
        this.#element = document.querySelector(this.#selectors);
        this.#profileImageDisplay = document.querySelector('#profile-image');
        this.#addChangeEventListener();
    }

    #addChangeEventListener() {
        this.#element.addEventListener('change', async (event) => {
            event.stopImmediatePropagation();
            const myUploadedFile = this.#element.files[0];
            const formData = new FormData();

            if (!myUploadedFile) return;

            formData.append("profile_image", myUploadedFile);
            
            await fetch('/api/v1/cloud', {
                method: "POST",
                body: formData,
                credentials: "include"
            }).then(async (response) => {
                const user = await response.json();
                this.#profileImageDisplay.setAttribute('src', user.normalInfo.avatar);
            })

            await fetch('/authentication/refresh', {
                credentials: "include"
            })
        })
    }
}