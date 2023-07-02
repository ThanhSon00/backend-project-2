
const resetPassword = (event) => {
    event.preventDefault();
    const newPassword = document.getElementById('newPassword').value;
    const repeatPassword = document.getElementById('repeatPassword').value;
    const userID = document.getElementById('userID').value;
    const url = window.location.href;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newPassword,
            repeatPassword,
            userID,
        })
    }).then(async (response) => {
        const message = await response.text();
        const notifyBox = document.querySelector('h5.notification');
        const errorBox = document.querySelector('h5.error-message');
        if (response.ok) {
            errorBox.innerText = "";
            notifyBox.innerText = message + '\n' + "You will be redirected to login page in 5s";
            setTimeout(() => {
                const originURL = window.location.origin;
                window.location.replace(`${originURL}/login`)
            }, 5000)
        }
        else if (response.status != 500) {
            notifyBox.innerText = "";
            errorBox.innerText = message;
        }
    }).catch((error) => {
        console.log(error);
    })
}

const resetPasswordButton = document.querySelector('.btn.btn-pill.text-white.btn-block.btn-primary');
resetPasswordButton.addEventListener('click', resetPassword);