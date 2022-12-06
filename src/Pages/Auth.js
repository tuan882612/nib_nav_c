import {
	Box, Button, FormControl, OutlinedInput, Typography
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useLocation, useNavigate } from 'react-router-dom';
import '../Assets/Styles/Auth.css';

const baseUrl = 'http://localhost:8080/auth/'

function Auth() {
	const navigate = useNavigate();
    const transfer = useLocation();
    const { handleSubmit } = useForm();
	
	const body = transfer.state

	const [value, setValue] = useState({key:''});
    const [error, setError] = useState({key:''});

	const id = (body.type !== 'edit')?
		body.email : body.prev.email

    useEffect(() => {
        axios.post(baseUrl+'generate/'+id)
            .then(response => {
				console.log('sent email to ',id)
			}).catch(error => console.log('couldnt send/create code'))
    },[body, id])

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
	
	const getMessage = () => {
		switch (body.type) {
			case 'register':
				return "Succesful Registered"
			case 'login':
				return "Succesful Logged In"
			case 'edit':
				return "Succesful Updated Profile"
			default:
				break;
		}
	}

	const onSubmit = () => {
        if (!error.key) {
            axios.get(baseUrl+'verify/'+parseInt(value.key))
                .then(() => {
					var login = {
						email: body.email,
						password: body.password
					}

					if (body.type === 'register') {
						axios.post('http://localhost:8080/user/create', body.prev)
							.then()
							.catch(error => console.log('couldnt create user'))
					} 
					if (body.type === 'edit') {
						axios.put('http://localhost:8080/user/update', {
							email: body.prev.email,
							name: body.prev.name,
							password: body.prev.password,
						}).then(axios.delete(
							'http://localhost:8080/user/delete/'
							+ body.email
						))
						.catch(() => console.log('couldnt update user'))
						login.email = body.prev.email
						login.password = body.prev.password
					}

					sessionStorage.setItem('id', id);
					sessionStorage.setItem('login', 'true');
					console.log('Valid login');

                    axios.post('http://localhost:8080/login/', login)
					.then(() => {
						navigate('/home', {
							replace: true, 
							state:{
								message:getMessage(),
								type:"success"
							}
						});
					});
				})
                .catch(error => {setError({...error, key:"Enter a valid code or refresh page to for a new code."})})
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
							type='submit'
						>
							submit
						</Button>
					</Box>
				</form>
			</Box>
		</Box>
	);
}

export default Auth;