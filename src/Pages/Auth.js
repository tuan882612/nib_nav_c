import {
	Box,
	OutlinedInput,
	FormControl,
	Button,
	Fade,
	Alert,
	Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import axios from 'axios';

import '../Assets/Styles/Auth.css';
import { useLocation, useNavigate } from 'react-router-dom';

const baseUrl = 'http://localhost:8080/auth/'

function Auth() {
	const navigate = useNavigate();
    const transfer = useLocation();
    
    const body = transfer.state
    const { handleSubmit } = useForm();

	const [value, setValue] = useState({key:''});
    const [error, setError] = useState({key:''});

    useEffect(() => {
        axios.post(baseUrl+'generate/'+body.email)
            .then(console.log('auth sent to email'))        
    },[body.email])


    const handleChange = (prop) => (event) => {
        const data = event.target.value
		
        setValue({...value, [prop]:data})

        setError(prev => {
            const stateObj = {...prev, [prop]:""}

            if (isNaN(data)) {
                stateObj[prop] = "Code must be all numerical values."
            }

            return stateObj
        })
    }

	const onSubmit = () => {
        if (!error.key) {
            axios.get(baseUrl+'verify/'+parseInt(value.key))
                .then(() => {            
                    const data = {
                        email: body.email,
                        password: body.password,
                    };

                    axios.post('http://localhost:8080/user/create', body)
            
                    axios.post('http://localhost:8080/login/', data)
                        .then((response) => {
                            if (response.status === 200) {
                                sessionStorage.setItem('id', body.email);
                                sessionStorage.setItem('login', 'true');
                                console.log('Valid login');
                                navigate('/home', { 
									replace: true, 
									state:{
										message:"Registration Successful",
										type:"success"
									}
								});
                            }
                        });
                    })
                .catch(error => setError({...error, key:"Enter a valid code or refresh page to for a new code."}))
        }
	};

	return (
		<Box
			className='authBody'
			onSubmit={handleSubmit(onSubmit)}
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
						<p className='authMsg'>Code Sent to : {transfer.state.email}</p>
                        <FormControl
							className='input'
							sx={{ width: '22ch' }}
							variant='outlined'
						>
							<OutlinedInput
								type={'name'}
								value={value.key}
                                inputProps={{ maxLength: 6 }}
                                placeholder='Enter 6 digit code'
								onChange={handleChange('key')}
							/>
						</FormControl>
                        
					</Box>
					<span className='err'>{error.key}</span>
					<Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '10px',
                        }}
                    >
						<Button 
							sx={{ 
                                mt: 2,
                                backgroundColor: '#5f7470',
                                color: 'white',
                                '&:hover': { backgroundColor: '#495A57' },
                            }}							
							onClick={() => console.log('hello')} 
							type='submit'
						>
							submit
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
		</Box>
	);
}

export default Auth;