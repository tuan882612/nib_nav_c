import {
	Button,
	Box,
	OutlinedInput,
	FormControl,
} from '@mui/material';
import '../Assets/Styles/EditProfile.css';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import React from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { FormHelperText } from '@mui/material';
import { styled } from '@mui/material/styles';

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
		showPassword: false,
	});

	const [error, setError] = useState({
		name: '',
		email: '',
		password: '',
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
		setError((prev) => {
			const stateObj = { ...prev, [prop]: '' };

			switch (prop) {
				case 'email':
					if (!value) {
						stateObj[prop] = 'Please enter Email.';
					} else if (!value === prevBody.email) {
						stateObj[prop] = 'Duplicate Email.';
					} else if (!validateEmail(value)) {
                        stateObj[prop] = "Please enter valid Email.";
                    } else {
						axios.get('http://localhost:8080/user/get/'+value)
							.then(() => setError({...error, email:'Email already exist.'}))
					}
					break;
				case 'name':
					if (!value) {
						stateObj[prop] = 'Please enter Name.';
					} else if (!value === prevBody.name) {
						stateObj[prop] = 'Duplicate Name.';
					}
					break;
				case 'password':
					if (!value) {
						stateObj[prop] = 'Please enter Password.';
					} else if (!value === prevBody.password) {
						stateObj[prop] = 'Duplicate Password.';
					}
					break;
				default:
					break;
			}

			return stateObj;
		});
	};

	const buildTextFields = () => {		
		if (validateError()) {
			console.log(values)
		}
	};

	return (
		<div className='body' onSubmit={handleSubmit(buildTextFields)}>
			<Box className='form-styler'>
				<div className='edit-header'>Edit Profile</div>
				<form>
					<div>
						<FormControl>
							<StyledInput
								placeholder='Enter New Name'
								onChange={handleEdit('name')}
							/>
							<span className='err'>{error.name}</span>
						</FormControl>
					</div>
					
					<div>
						<FormControl>
							<StyledInput
								onChange={handleEdit('email')}
								placeholder='Enter New Email'
							/>
							<span className='err'>{error.email}</span>
						</FormControl>
					</div>
					
					<div>
						<FormControl>
							<StyledInput
								onChange={handleEdit('password')}
								placeholder='Enter New Password'
							/>
							<span className='err'>{error.password}</span>
						</FormControl>
					</div>

					<div>
						<StyledButton
							type='submit'
							onClick={handleSubmit}
							sx={{
								ml:'1.5rem'
							}}
						>
							Submit
						</StyledButton>
						<StyledButton
							onClick={() => {
								navigate('/profile');
							}}
							sx={{
								ml:'2rem'
							}}
						>
							Cancel
						</StyledButton>
					</div>
				</form>
			</Box>
		</div>
	);
}
