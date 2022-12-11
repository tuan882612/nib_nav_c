import {
	Button, Typography,
} from '@mui/material';
import '../Assets/Styles/Profile.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';


const ads = [
		{
			link: 'https://www.kroger.com/',
			picture: 'kroger.png',
		},
		{
			link: 'https://www.amazon.com/',
			picture: 'amz.png',
		},
		{
			link: 'https://spoonacular.com/',
			picture: 'spa.png',
		},
	];

function Profile() {
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [on, setOn] = useState(true)
	const [item, setItem] = useState({
		link:'',
		picture:''
	})

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

	useEffect(() => {
		const temp = ads.at(Math.floor(Math.random()*ads.length))
		setItem({...item, link:temp.link, picture:temp.picture})
	},[])

	const getAds = () => {
		return (on)?
			<Box
				sx={{
					width:'10px',
					height:'10px',
					ml:'2.5vh',
					mt:'2vh'
				}}
			>
				<a
					href='https://www.amazon.com/'
					target='_blank'
				>
					<img
						src={require('../Assets/Pictures/amz.png')}
					/>
				</a>	
					
			</Box>:<Box/>
	}

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
				<Button
					onClick={() => setOn(!on)}
					sx={{
						mt:'4vh',
						bgcolor: '#5f7470',
						color: 'white',
						px: '2rem',
						ml:'1vh'
					}}
				>
					Toggle Ads
				</Button>
				{getAds()}
			</div>
		</div>
	);
}

export default Profile;
