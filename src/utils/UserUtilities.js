import axios from 'axios';

export default function CheckSession() {
	console.log('Checking for sessions');

	if (sessionStorage.getItem('login') === 'false') {
		sessionStorage.setItem('login', 'false');
		sessionStorage.setItem('id', '');
	} else {
		axios.get('http://localhost:8080/verify/' + sessionStorage.getItem('id'))
		.then((response) => {
			if (response.status === 200) {
				console.log('In session');		
			}
		}).catch((error) => {
			sessionStorage.setItem('login', 'false');
			sessionStorage.setItem('id', '');

			console.log('Session timeout');
		})
	}
}
