import axios from 'axios';

export default function checkSession() {
    console.log('Checking for sessions')
    
	axios.get('http://localhost:8080/verify/'+sessionStorage.getItem("id"))
	.then((response) => {
		console.log("Session valid")
	}).catch((error) => {
		sessionStorage.setItem("login", false)
		sessionStorage.setItem("id", "")
		console.log("Session timeout")
	})
}