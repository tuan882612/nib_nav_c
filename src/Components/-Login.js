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
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';

function Login() {
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
		var success = false
		const body = {
			email: values.username,
			password: values.password,
		};

		axios.post('http://localhost:8080/login/', body)
		.then((response) => {
			if (response.status === 200) {
				sessionStorage.setItem('id', values.username);
				sessionStorage.setItem("login", true)
				success = true

				console.log('Valid login');
			} else {
				console.log('Invalid input');
			}
			console.log(success)
			return success
		});
	};

	return (
		<div>
			<form>
				<Box>
					<FormControl
						sx={{ m: 1, width: '25ch' }}
						variant='outlined'
					>
						<InputLabel>Username</InputLabel>
						<OutlinedInput
							name='username'
							value={values.username}
							onChange={handleChange('username')}
							label='Username'
						/>
					</FormControl>
				</Box>
				<Box>
					<FormControl
						sx={{ m: 1, width: '25ch' }}
						variant='outlined'
					>
						<InputLabel>Password</InputLabel>
						<OutlinedInput
							type={values.showPassword ? 'text' : 'password'}
							name='password'
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
							label='Password'
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
					<Button type='submit'>forgot password</Button>
				</Box>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Button type='submit'>register</Button>
					<Button onClick={handleSubmit(onSubmit)} type='submit'>login</Button>
				</Box>
				<Fade in={onSubmit === true} timeout={4000}>
					<Alert severity="success">Login Success!</Alert>
				</Fade>
				<Fade in={onSubmit === false} timeout={4000}>
					<Alert severity="error">Invalid Login!</Alert>			
				</Fade>
			</form>
		</div>
	);
}

export default Login;
