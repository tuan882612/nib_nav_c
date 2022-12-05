import {
	Button,
} from '@mui/material';
import '../Assets/Styles/Profile.css';
import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
	});

	const navigate = useNavigate();

	if (sessionStorage.getItem('login') === 'true') {
		axios
			.get(
				'http://localhost:8080/user/get/' + sessionStorage.getItem('id')
			)
			.then((response) => {
				const body = response.data;
				setValues({
					...values,
					name: body.name,
					email: body.email,
					password: body.password,
				});
			});
	}

	return (
		<div className='main-container'>
			<div className='wrapper-container'>
				<div id='profile-header'>Profile</div>
				<div className='profile-contents'>Name: {values.name}</div>
				<div className='profile-contents'>Email: {values.email}</div>
				<Button
					onClick={() => {
						navigate('/editprofile',{
							state:{
								name:values.name,
								email:values.email,
								password:values.password
							}
						});
					}}
					sx={{
						bgcolor: '#5f7470',
						color: 'white',
						px: '2rem',
					}}
				>
					Edit Profile
				</Button>
			</div>
		</div>
	);
}

export default Profile;
