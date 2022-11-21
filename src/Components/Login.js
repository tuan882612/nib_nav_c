import {
	Box,
	OutlinedInput,
	FormControl,
	InputAdornment,
	InputLabel,
	IconButton,
	Button,
	TextField,
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
		const body = {
			email: values.username,
			password: values.password,
		};

		axios.post('http://localhost:8080/login/', body).then((response) => {
			if (response.status === 200) {
				sessionStorage.setItem('id', values.username);
				sessionStorage.setItem("login", true)
				console.log(sessionStorage.getItem('id'), response.data);
			} else {
				console.log('Invalid input');
			}
		});
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
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
				</div>
				<Box sx={{}}>
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
					<Button type='submit'>login</Button>
				</Box>
			</form>
		</div>
	);
}

export default Login;
