const originURL = "https://localhost:8080"

$(function () {
	'use strict';
	$('.form-control').on('input', function () {
		var $field = $(this).closest('.form-group');
		if (this.value) {
			$field.addClass('field--not-empty');
		} else {
			$field.removeClass('field--not-empty');
		}
	});

});

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
			window.location.replace(`${originURL}/home`);
		}).catch((error) => {
			console.log(error);
		});
	});
}

