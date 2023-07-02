const facebookLogin = () => {
	FB.api('/me', (response) => {
		fetch(`${originURL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: response.name,
				selector: response.id,
			})
		}).then(() => {
			const originURL = window.location.origin;
			window.location.replace(`${originURL}/home`);
		}).catch((error) => {
			console.log(error);
		});
	});
}

const normalLogin = (event) => {
	event.preventDefault();
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const rememberMe = document.querySelector('.control.control--checkbox.mb-0 input').checked;
	const originURL = window.location.origin;

	fetch(`${originURL}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email, 
			password, 
			rememberMe,
		})
	}).then(async (response) => {
		if (response.ok) {
			window.location.replace(`${originURL}/home`);
		}
		else if (response.status != 500) {
			const message = await response.text();
			document.querySelector('.error-message').innerText = message; 
		}
	}).catch((error) => {
		console.log(error);		
	})
}

const loginButton = document.querySelector('.btn.btn-pill.text-white.btn-block.btn-primary');
loginButton.addEventListener('click', normalLogin);