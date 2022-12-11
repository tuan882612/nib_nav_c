import {
	Box,
	OutlinedInput,
	FormControl,
	IconButton,
	Button,
	Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../Assets/Styles/Login.css';

const StyledBox = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	marginTop: '10px',
}));

const StyledButton = styled(Button)(() => ({
	backgroundColor: '#5f7470',
	color: 'white',
	'&:hover': { backgroundColor: '#495A57' },
}));

function LoginPage() {
	const navigate = useNavigate();

	const [values, setValues] = useState({
		email: '',
		password: '',
		showPassword: false,
	});

	const [error, setError] = useState({
		email: '',
		password: '',
		invalid:''
	});

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

	const handleChange = (prop) => (event) => {
		const value = event.target.value;

		setValues({ ...values, [prop]: value });

		setError({...error, invalid:''})
		setError((prev) => {
			const stateObj = { ...prev, [prop]: '' };

			switch (prop) {
				case 'email':
					if (!value) {
						stateObj[prop] = 'Please enter Email.';
					}
					if (!validateEmail(value)) {
                        stateObj[prop] = "Please enter valid Email.";
					}
					break;
				case 'password':
					if (!value) {
						stateObj[prop] = 'Please enter Password.';
					}
					break;
				default:
					break;
			}

			return stateObj;
		});
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

	const { handleSubmit } = useForm();

	const handleCred = () => {
		if (!values.email && !values.password) {
			setError({...error, invalid:'The username or(and) password are empty.'})
		} else {
			const body = {
				email: values.email,
				password: values.password,type:'login'
			};

			axios.get('http://localhost:8080/user/get/'+values.email)
				.then()
				.catch(() => { 
					setError({
						...error, 
						email:"Email does not exist please register."
					})
				});

			if (validateError()) {
				axios.post('http://localhost:8080/login/', body)
					.then((response) => {
						if (response.status === 200) {
							console.log('Valid login');
							navigate('/auth', {state:body});
						} else {
							setError({...error, invalid:'Invalid user credientials.'})
							console.log('Invalid input');
						}
					});
			}
		}

		
	};

	return (
		<Box
			className='loginBody'
			onSubmit={handleSubmit(handleCred)}
		>
			<Box>
				<Typography
					variant='h2'
					sx={{
						mt: '100px',
						textAlign: 'center',
					}}
				>
					Nib-Nav
				</Typography>
				<form>
					<Box>
						<p className='loginEmail'>EMAIL</p>
						<FormControl
							className='input'
							sx={{ width: '25ch' }}
							variant='outlined'
						>
							<OutlinedInput
								type={'name'}
								value={values.email}
								placeholder='Enter Email'
								onChange={handleChange('email')}
							/>
						</FormControl>
					</Box>
					<span className='err'>{error.email}</span>

					<p className='loginPassword'>PASSWORD</p>
					<Box>
						<FormControl
							className='input'
							sx={{ width: '25ch' }}
							variant='outlined'
						>
							<OutlinedInput
								type={values.showPassword ? 'text' : 'password'}
								value={values.password}
								placeholder='Enter Password'
								onChange={handleChange('password')}
								endAdornment={
									<IconButton
										aria-label='toggle-password-visibility'
										onClick={() =>
											setValues({
												...values,
												showPassword:
													!values.showPassword,
											})
										}
										onMouseDown={(event) =>
											event.preventDefault()
										}
										edge='end'
									>
										{values.showPassword ? (
											<VisibilityOff />
										) : (
											<Visibility />
										)}
									</IconButton>
								}
							/>
						</FormControl>
					</Box>
					<span className='err'>{error.password}</span>
					<StyledBox>
						<StyledButton
							sx={{ mt: 5 }}
							onClick={() => navigate('/forgotpassword')}
							type='button'
						>
							forgot password
						</StyledButton>
					</StyledBox>
					<StyledBox>
						<StyledButton
							onClick={() =>
								navigate('/register', {
									state: { meow: 'meow' },
								})
							}
							type='button'
						>
							register
						</StyledButton>
						<StyledButton
							sx={{ ml: 1 }}
							type='submit'
						>
							login
						</StyledButton>
					</StyledBox>
				</form>
				<Typography
					align="center"
					color='#e64646'
					sx={{mt:'2vh'}}
				>
					{error.invalid}
				</Typography>
			</Box>
		</Box>
	);
}

export default LoginPage;
