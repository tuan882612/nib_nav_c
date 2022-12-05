import '../Assets/Styles/Home.css';
import { 
	Box, 
	Container, 
	FormControl, 
	OutlinedInput, 
	Typography,
	TextareaAutosize,
	TextField
} from '@mui/material';
import Map from './Search';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import CheckSession from '../utils/UserUtilities';

import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import { width } from '@mui/system';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Home() {
	const transfer = useLocation();
	const navigate = useNavigate();
	const { handleSubmit } = useForm();

	const [open, setOpen] = useState(true);	

	useEffect(() => {
		setTimeout(() => {
			setOpen(false);
		}, 3000);
	}, [transfer]);

	const [values, setValues] = useState({
		name:'',
		comment:''
	})

	const [error, setError] = useState({
		name:'',
		comment:''
	})

	const handleChange = (prop) => (event) => {
		const value = event.target.value
		setValues({...values, [prop]:value})
		setError(prev => {
			const stateObj = {...prev, [prop]:""}

			switch (prop) {
				case 'name':
					if (!value) {
						stateObj[prop] = 'error'
					}
					break;
				case 'comment':
					if (!value) {
						stateObj[prop] = 'error'
					}
					break;
				default:
					break;
			}
			return stateObj
		})

		
	}

	const validateError = () => {
		var res = true;
		Object.keys(error).forEach((element) => {
			if (error[element]) {
				res = false;
			}
		});
		return res;
	};

	const onSubmit = () => {
		if (validateError() && 
			values.name.length !== 0 && 
			values.comment.length!==0) {
			axios.post('http://localhost:8080/feedback/create',{
				email:sessionStorage.getItem('id'),
				name:values.name,
				comment:values.comment
			}).then(() => {
				navigate('/home', {
					state: { 
						message: 'Successfully submit for feedback.',
						type:"success" 
					},
				})
				window.location.reload(true)
			})
			
		} else {
			navigate('/home', {
				state: { 
					message: 'One or more inputs were empty.',
					type:"error" 
				},
			})
			window.location.reload(true)
		}
		
	}

	return (
		<div className='body'>
			<Typography
				variant='h3'
				sx={{
					textAlign: 'center',
					mt:'3.5rem',
					position: 'absolute'
				}}
			>
				Welcome to Nib-Nav
			</Typography>
			<Box>
				<Box 
					sx={{
						bgcolor: '#5f7470', 
						height: '60vh',
						width:'40vh',
						borderRadius: '16px',
						border: '1px solid',
						borderColor: 'white',
						mt:'19vh',
						mr:'3vh',
					}}
					
				>
					<p className='feedback-header'>
						feedback
					</p>
					<Box
						sx={{
							bgcolor: '#2E3837', 
							height: '51.7vh',
							width:'40vh',
							borderBottomLeftRadius: '15px',
							borderBottomRightRadius: '15px',
							borderColor: 'white',
						}}
						onSubmit={handleSubmit(onSubmit)}
					>
						<form>
							<FormControl
								sx={{
									mt:'.5rem',
									ml:'3.75rem',
									width:'27.5vh'
								}}
							>
								<p className='feedBack-form-label'>NAME</p>
								<OutlinedInput
									className='home-input'
									placeholder='Enter Name'
									type={'name'}
									value={values.name}
									onChange={handleChange('name')}
								>

								</OutlinedInput>
							</FormControl>
							<FormControl
								sx={{
									ml:'3.75rem',
									width:'27.5vh',
								}}
							>
								<p className='feedBack-form-label'>COMMENT</p>
								<TextField
									className='home-input'
									placeholder='Enter Comment'
									multiline
									type={'name'}
									value={values.comment}
									inputProps={{ maxLength: 260 }}
									onChange={handleChange('comment')}
								>

								</TextField>

							</FormControl>
							<Button
								sx={{
									bgcolor: '#5f7470',
									color: 'white',
									'&:hover': { backgroundColor: '#495A57' },
									width:'15vh',
									ml:'12.5vh',
									mt:'3vh'
								}}
								type='submit'
							>
								submit
							</Button>
						</form>
					</Box>
				</Box>				
			</Box>

			<Box 
				sx={{ 
					bgcolor: '#5f7470', 
					height: '60vh',
					width:'30vh',
					borderRadius: '16px',
					border: '1px solid',
					borderColor: 'white',
					mt:'19vh',
				}} 
			>
				{}
			</Box>
			<div className='alert-body'>
				<Collapse in={open && transfer.state.message && transfer.state.type}>
					<Alert
						sx={{
							mb: 2,
							width: '100%',
						}}
						severity={transfer.state.type}
					>
						{transfer.state.message}
					</Alert>
				</Collapse>
			</div>
		</div>
	);
}

export default Home;
