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
import axios from 'axios';

import '../Assets/Styles/Register.css';
import { useNavigate } from 'react-router-dom';

const StyledBox = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	marginTop: '7px',
}));

const StyledButton = styled(Button)(() => ({
	backgroundColor: '#788c7c',
	color: 'white',
	'&:hover': { backgroundColor: '#5b6b5e' },
}));

function Register() {
	const navigate = useNavigate();

	const [values, setValues] = useState({
		email: '',
        name: '',
		password: '',
        confirmPassword: '',
		showPassword: false,
        showConfirmPassword: false,
	});

    const [error, setError] = useState({
		email: 'Please enter Email.',
        name: 'Please enter name.',
		password: 'Please enter Password.',
        confirmPassword: 'Please enter Confirm Password.',
	});

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const validateError = () => {
        var res = true
        Object.keys(error).forEach(element => {
            if (error[element]) {
                res = false
            }
        });
        return res
    }

	const handleChange = (prop) => (event) => {
        const value = event.target.value

		setValues({ ...values, [prop]: value });

        setError(prev => {
            const stateObj = { ...prev, [prop]: "" };

            switch (prop) {
                case "email":
                    if (!value) {
                        stateObj[prop] = "Please enter Email.";
                    } else if (!validateEmail(value)) {
                        stateObj[prop] = "Please enter valid Email.";
                    } else {
						axios.get('http://localhost:8080/user/get/'+value)
							.then(() => setError({...error, email:"Email already exist please return to login"}))
					}
                    break;
                case "name":
                    if (!value) {
                        stateObj[prop] = "Please enter name.";
                    }
                    break;
                case "password":
                    if (!value) {
                        stateObj[prop] = "Please enter Password.";
                    } else if (value.length < 8) {
                        stateObj[prop] = "Please enter Password with a minimum length 8.";
                    } else if (values.confirmPassword && value !== values.confirmPassword) {
                        stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
                    } else {
                        stateObj["confirmPassword"] = values.confirmPassword ? "" : error.confirmPassword;
                    }
                    break;
        
                case "confirmPassword":
                    if (!value) {
                        stateObj[prop] = "Please enter Confirm Password.";
                    } else if (values.password && value !== values.password) {
                        stateObj[prop] = "Password and Confirm Password does not match.";
                    }
                    break;
        
                default:
                break;
            }

            return stateObj;
        });
	};

	const { handleSubmit } = useForm();

	const handleCred = () => {
		const body = {
            name: values.name,
			email: values.email,
			password: values.password,
			type:'register'
		};

        if (validateError()) {
            navigate('/auth', {state:body})
        }
	}

	return (
		<Box
			className='regBody'
			onSubmit={handleSubmit(handleCred)}
		>
			<Box>
				<Typography
					variant='h4'
					sx={{
						mt: '70px',
						textAlign: 'center',
					}}
				>
					Register Account
				</Typography>
				<form>
					<Box>
						<p className='regEmail'>EMAIL</p>
						<FormControl
							className='input'
							sx={{ width: '25ch' }}
							variant='outlined'								
                            value={values.email}
							onChange={handleChange('email')}
						>
							<OutlinedInput 
                                type={'name'}
                                placeholder='Enter Email'
                            />
						</FormControl>
					</Box>
                    <span className='err'>{error.email}</span>
                    
                    <Box>
						<p className='regName'>NAME</p>
						<FormControl
							className='input'
							sx={{ width: '25ch' }}
							variant='outlined'								
                            value={values.name}
							onChange={handleChange('name')}
						>
							<OutlinedInput 
                                type={'name'}
                                placeholder='Enter Name'
                            />
						</FormControl>
					</Box>
                    <span className='err'>{error.name}</span>

					<Box>
                        <p className='regPassword'>PASSWORD</p>
						<FormControl
							className='input'
							sx={{ width: '25ch' }}
							variant='outlined'
                            value={values.password}
                            onChange={handleChange('password')}
						>
							<OutlinedInput
								type={values.showPassword ? 'text' : 'password'}
                                placeholder='Enter Password'
								endAdornment={
									<IconButton
										aria-label='toggle-password-visibility'
										onClick={() => setValues({...values, showPassword: !values.showPassword})}
										onMouseDown={(event) => event.preventDefault()}
										edge='end'
									>
										{values.showPassword ? (<VisibilityOff />) : (<Visibility />)}
									</IconButton>
								}
							/>
						</FormControl>
					</Box>
                    <span className='err'>{error.password}</span>

					<Box>
                        <p className='regPassword'>CONFIRM PASSWORD</p>
						<FormControl
							className='input'
							sx={{ width: '25ch' }}
							variant='outlined'
                            value={values.confirmPassword}
							onChange={handleChange('confirmPassword')}
						>
							<OutlinedInput
								type={values.showConfirmPassword ? 'text' : 'password'}
                                placeholder='Confirm Password'
								endAdornment={
									<IconButton
										aria-label='toggle-password-visibility'
										onClick={() => setValues({...values, showConfirmPassword: !values.showConfirmPassword})}
										onMouseDown={(event) => event.preventDefault()}
										edge='end'
									>
										{values.showConfirmPassword ? (<VisibilityOff />) : (<Visibility />)}
									</IconButton>
								}
							/>
						</FormControl>
					</Box>
                    <span className='err'>{error.confirmPassword}</span>
                    
					<StyledBox>
						<StyledButton 
                            sx={{ mt: 3 }}
                            type='submit'
                        >
							submit
						</StyledButton>
					</StyledBox>
				</form>
			</Box>
		</Box>
	);
}

export default Register;
