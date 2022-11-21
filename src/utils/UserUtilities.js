import axios from 'axios';

export default function CheckSession() {
	console.log('Checking for sessions');

	if (sessionStorage.getItem('login') === 'true') {
		axios.get('http://localhost:8080/verify/' + sessionStorage.getItem('id'))
		.then((response) => {
			if (response.status === 404) {
				sessionStorage.setItem('login', 'false');
				sessionStorage.setItem('id', '');

				console.log('Session timeout', response.status);
			}

			console.log('In session', response.status);
		}).catch((error) =>{
			sessionStorage.setItem('login', 'false');
			sessionStorage.setItem('id', '');
		})
	} else {
		sessionStorage.setItem('login', 'false');
		sessionStorage.setItem('id', '');
	}
}
