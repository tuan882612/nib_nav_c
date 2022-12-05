import {
	Button, Typography,
} from '@mui/material';
import '../Assets/Styles/Profile.css';
import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';

function Profile() {
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
	});

	const navigate = useNavigate();

	axios.get(
		'http://localhost:8080/user/get/'
		+ sessionStorage.getItem('id')
	).then((response) => {
		const body = response.data;
		setValues({
			...values,
			name: body.name,
			email: body.email,
			password: body.password,
		});
	});

	return (
		<div className='main-container'>
			<div>
				<Typography
					variant='h3'
					sx={{mt:'5vh'}}
				>
					Profile
				</Typography>
				<Box sx={{mt:'2vh'}}>
					<Typography
						variant='text'
						sx={{mt:'5vh'}}
					>
						Name: {values.name}
					</Typography>
				</Box>
				<Box sx={{mt:'2vh'}}>
					<Typography
						variant='text'
						sx={{mt:'5vh'}}
					>
						Email: {values.email}
					</Typography>					
				</Box>

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
						mt:'4vh',
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
