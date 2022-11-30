import {
	Button, TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle
} from '@mui/material';
import '../Assets/Styles/Profile.css';
import { useState } from 'react';
import axios from 'axios';
import React from 'react';

function Profile() {	
	const[open,setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	}

	const handleClickClose = () => {
		setOpen(false);
	}

	const [values, setValues] = useState({
		name:'',
		email:'',
		password:''
	})

    if (sessionStorage.getItem('login') === 'true') {
        axios.get('http://localhost:8080/user/get/' + sessionStorage.getItem('id'))
        .then((response) => {
			const body = response.data
			setValues({...values, 
				name: body.name,
				email: body.email,
				password: body.password
			})
		});
    }

	return (
		<div className='main-container'>
			<div className='wrapper-container'>
				<div id='profile-header'>Profile</div>
				<div className='profile-contents'>Name: <Button
					sx={{
						backgroundColor: 'inherit',
						color: 'white',
						'&:hover': { backgroundColor: '#495A57' },
						display: 'inline',
					}}
					color='inherit'
					variant='outlined'
					onClick={handleClickOpen}
					
				>
					{values.name}
				</Button>
				<Dialog open ={open} onClose={handleClickClose}>
					<DialogTitle>Edit Credentials</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Change Name
						</DialogContentText>
						<TextField 
						autoFocus
						margin = "dense"
						id = "Name"
						label = {values.name}
						type = "Name"
						fullWidth
						variant= "standard"
						InputProps={{style:{fontSize:30}}}
						InputLabelProps={{style : {fontSize:30}}}/>
					</DialogContent>
				</Dialog></div>
				<div className='profile-contents'>Email: <Button
					sx={{
						backgroundColor: 'inherit',
						color: 'white',
						'&:hover': { backgroundColor: '#495A57' },
						display: 'inline',
					}}
					color='inherit'
					variant='outlined'
					onClick={handleClickOpen}
					
				>
					{values.email}
				</Button>
				<Dialog open ={open} onClose={handleClickClose}>
					<DialogTitle>Edit Credentials</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Change Email
						</DialogContentText>
						<TextField 
						autoFocus
						margin = "dense"
						id = "Email"
						label = {values.email}
						type = "email"
						fullWidth
						variant= "standard"
						InputProps={{style:{fontSize:30}}}
						InputLabelProps={{style : {fontSize:30}}}/>
					</DialogContent>
				</Dialog></div>
				
			</div>
		</div>
	);
}

export default Profile;
