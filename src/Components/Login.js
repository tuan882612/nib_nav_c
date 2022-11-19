import { Box, OutlinedInput, FormControl, InputAdornment, InputLabel, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {useState} from 'react'

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

	return (
		<div>
			<Box>
				<FormControl
					sx={{ m: 1, width: '25ch'}}
					variant='outlined'
				>
					<InputLabel>Username</InputLabel>
					<OutlinedInput
						value={values.username}
						onChange={handleChange('username')}
						label='Username'
					/>
				</FormControl>
				<FormControl
					sx={{ m: 1, width: '25ch' }}
					variant='outlined'
				>
					<InputLabel>Password</InputLabel>
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
						label='Password'
					/>
				</FormControl>
			</Box>
		</div>
	);
}

export default Login;
