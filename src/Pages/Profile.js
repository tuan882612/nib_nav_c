import '../Assets/Styles/Profile.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

// const getURL = 'http://localhost:8080/user/get/' + sessionStorage.getItem('id');

function Profile() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

    if (sessionStorage.getItem('login') === 'true') {
        axios.get('http://localhost:8080/user/get/' + sessionStorage.getItem('id'))
        .then((response) => {
            setName(response.data.name)
            setEmail(response.data.email)
            setPassword(response.data.password)
		});
    }

	return (
		<div className='main-container'>
			<div>
				<div id='profile-header'>Profile</div>
				<div className='profile-contents'>Name: {name}</div>
				<div className='profile-contents'>Email: {email}</div>
			</div>
		</div>
	);
}

export default Profile;
