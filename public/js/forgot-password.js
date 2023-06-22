const originURL = "https://localhost:8080"

const sendRequestToResetPassword = (event) => {
	event.preventDefault();
	const email = document.getElementById('email').value;
	fetch(`${originURL}/forgot-password`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email })
	}).then(async (response) => {
		const message = await response.text();
		const notifyBox = document.querySelector('.notification');
		const errorBox = document.querySelector('.error-message'); 
		if (response.ok) {
			errorBox.innerText = "";
			notifyBox.innerText = message;
		}
		else if (response.status != 500) {
			notifyBox.innerText = "";
			errorBox.innerText = message;	
		}
	}).catch((error) => {
		console.log(error);
	});
}

const requestResetButton = document.querySelector('form.forgot-password input.btn.btn-pill.text-white.btn-block.btn-primary')
requestResetButton.addEventListener('click', sendRequestToResetPassword);
