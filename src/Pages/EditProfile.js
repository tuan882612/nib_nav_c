import {
	Button,
	Box,
	OutlinedInput,
	FormControl,
	Typography
} from '@mui/material';
import '../Assets/Styles/EditProfile.css';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import React from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { FormHelperText } from '@mui/material';
import { styled } from '@mui/material/styles';

const baseUrl = 'http://localhost:8080/user/'

const StyledInput = styled(OutlinedInput)(() => ({
	input: { color: 'black' },
	backgroundColor: 'white',
	width: '25rem',
	marginBottom: '2rem',
	variant: 'outlined',
}));

const StyledButton = styled(Button)(() => ({
	backgroundColor: '#5f7470',
	color: 'white',
	marginBottom: '1rem',
	width: '10rem',
	'&:hover': { backgroundColor: '#495A57' },
}));

export default function EditProfile() {
	const navigate = useNavigate();
	const transfer = useLocation();
	const { handleSubmit } = useForm();

	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [error, setError] = useState({
		name: '',
		email: '',
		password: '',
		empty: ''
	});

	const prevBody = {
		name: transfer.state.name,
		email: transfer.state.email,
		password: transfer.state.password,
	};

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

	const validateError = () => {
		var res = true;
		Object.keys(error).forEach((element) => {
			if (error[element]) {
				res = false;
			}
		});
		return res;
	};

	const handleEdit = (prop) => (event) => {
		const value = event.target.value;
		setValues({ ...values, [prop]: value });
		setError({...error, empty:''})
		setError((prev) => {
			const stateObj = { ...prev, [prop]: ''};

			switch (prop) {
				case 'email':
					if (!value) {
						stateObj[prop] = '';
						break;
					}
					if (value === prevBody.email) {
						stateObj[prop] = 'Duplicate Email.';
					} else if (!validateEmail(value)) {
                        stateObj[prop] = "Please enter valid Email.";
                    } else {
						axios.get(baseUrl+'get/'+value)
							.then(() => setError({...error, email:'Email already exist.'}))
					}
					break;
				case 'name':
					if (!value) {
						stateObj[prop] = '';
						break;
					}
					if (value === prevBody.name) {
						stateObj[prop] = 'Duplicate Name.';
					}
					break;
				case 'password':
					if (!value) {
						stateObj[prop] = '';
						break;
					}
					if (value === prevBody.password) {
						stateObj[prop] = 'Duplicate Password.';
					} else if (value.length < 8) {
                        stateObj[prop] = "Please enter Password with a minimum length 8.";
                    }
					break;
				default:
					break;
			}
			
			return stateObj;
		});
	};

	const buildTextFields = () => {
		if (!values.email && !values.name && !values.password) {
			setError({...error, empty:'There were no changes made.'})
		} else {
			if (validateError()) {
				axios(baseUrl+'get/'+prevBody.email)
					.then(response => {
						var body = response.data
						
						if (values.email) {
							body.email = values.email
						}
						if (values.name) {
							body.name = values.name
						}
						if (values.password) {
							body.password = values.password
						}

						navigate('/auth', {
							state:{
								email:prevBody.email,
								name:prevBody.name,
								password:prevBody.password,
								prev:body,
								type:"edit"
							}
						})
					})
			}
		}
	};

	return (
		<div className='body' onSubmit={handleSubmit(buildTextFields)}>
			<Box className='form-styler'>
				<Typography
					align="center"
					variant='h3'
					sx={{
						mt:'5vh',
						mb:'4vh',
						
					}}
				>
					Edit Profile
				</Typography>
				<form>
					<p className='text-header'>NAME</p>
					<div>
						<FormControl>
							<StyledInput
								placeholder='Enter New Name'
								onChange={handleEdit('name')}
							/>
							<span className='err'>{error.name}</span>
						</FormControl>
					</div>
					
					<p className='text-header'>EMAIL</p>
					<div>
						<FormControl>
							<StyledInput
								onChange={handleEdit('email')}
								placeholder='Enter New Email'
							/>
							<span className='err'>{error.email}</span>
						</FormControl>
					</div>
					
					<p className='text-header'>PASSWORD</p>
					<div>
						<FormControl>
							<StyledInput
								onChange={handleEdit('password')}
								placeholder='Enter New Password'
							/>
							<span className='err'>{error.password}</span>
						</FormControl>
					</div>

					<Box sx={{mt:'3vh'}}>
						<StyledButton
							type='submit'
							onClick={handleSubmit}
							sx={{ml:'1.7rem'}}
						>
							Submit
						</StyledButton>
						<StyledButton
							onClick={() => navigate('/profile')}
							sx={{ml:'1.7rem'}}
						>
							Cancel
						</StyledButton>
					</Box>
					
				</form>
				<Typography
					align="center"
					color='#e64646'
				>
					{error.empty}
				</Typography>
			</Box>
		</div>
	);
}
