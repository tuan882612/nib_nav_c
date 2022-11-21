import {
	Box,
	OutlinedInput,
	FormControl,
	InputAdornment,
	InputLabel,
	IconButton,
	Button,
	Fade,
	Alert,
    TextField,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';

import '../Assets/Styles/LoginPage.css'
import { Navigate } from 'react-router-dom';

function LoginPage() {
	const [values, setValues] = useState({
		username: '',
		password: '',
		showPassword: false,
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
		console.log(event.target.value);
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const { handleSubmit } = useForm();

	const onSubmit = (event) => {
		const body = {
			email: values.username,
			password: values.password,
		};

		axios.post('http://localhost:8080/login/', body)
		.then((response) => {
			if (response.status === 200) {
				sessionStorage.setItem('id', values.username);
				sessionStorage.setItem("login", true)
				console.log('Valid login');
				
				return true
			} else {
				console.log('Invalid input');
				return false
			}
		});
	};

	return (
		<Box className='loginBody' onSubmit={handleSubmit(onSubmit)}>
			<form>
				<Box>
                    <p className='loginEmail'>email</p>
					<FormControl
						className='input'
						sx={{ width: '25ch' }}
						variant='outlined'
					>
						<OutlinedInput
							type={'username'}
							value={values.username}
							onChange={handleChange('username')}
						/>					
					</FormControl>
				</Box>
                <p className='loginPassword'>password</p>
				<Box>
					<FormControl
                        className='input'
						sx={{ width: '25ch' }}
						variant='outlined'
					>
						<OutlinedInput
							type={values.showPassword ? 'text' : 'password'}
							value={values.password}
							onChange={handleChange('password')}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle-password-visibility'
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge='end'
									>
										{values.showPassword ? (
											<VisibilityOff />
										) : (
											<Visibility />
										)}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
				</Box>
				<Box
					sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}
				>
					<Button 
                        sx={{ 
                            bgcolor: '#788c7c',
                            color:'white',
                            "&:hover":{bgcolor: '#5b6b5e'},
                            mt:5
                        }} 
                        type='submit'
                    >
                        forgot password
                    </Button>
				</Box>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
                        mt: 1,
					}}
				>
					<Button 
                        sx={{ 
                            bgcolor: '#788c7c',
                            color:'white',
                            "&:hover":{bgcolor: '#5b6b5e'}
                        }}
                        type='submit'
					>
						register
					</Button>
					<Button 
                        sx={{ 
                            bgcolor: '#788c7c',
                            color:'white',
                            ml: 1,
                            "&:hover":{bgcolor: '#5b6b5e'}
                        }}  
                        type='submit'
						onClick={(onSubmit) => {
							if (onSubmit === true) {
								Navigate("/")
							}
						}}
					>
						login
					</Button>
				</Box>
				{/* <Fade in={onSubmit === true} timeout={4000}>
					<Alert severity="success">Login Success!</Alert>
				</Fade>
				<Fade in={onSubmit === false} timeout={4000}>
					<Alert severity="error">Invalid Login!</Alert>			
				</Fade> */}
			</form>
		</Box>
	);
}

export default LoginPage;
