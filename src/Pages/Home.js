import '../Assets/Styles/Home.css';
import {
	Box,
	FormControl,
	OutlinedInput,
	Typography,
	TextField,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ListButton = styled(Box)(() => ({
	backgroundColor: '#2E3837',
	borderRadius: '0',
	padding: '20px',
	borderBottom: 'solid',
	borderWidth: '1px',
	fontSize: '20px',
	color: 'white',
	'&:hover': { backgroundColor: '#495A57' },
}));

function Home() {
	const transfer = useLocation();
	const navigate = useNavigate();
	const { handleSubmit } = useForm();

	const [orders, setOrders] = useState([]);
	const [open, setOpen] = useState(true);

	const [header, setHeader] = useState({
		name: '',
	});

	const [values, setValues] = useState({
		name: '',
		comment: '',
	});

	const [error, setError] = useState({
		name: '',
		comment: '',
	});

	useEffect(() => {
		axios.get('http://localhost:8080/user/get/' + sessionStorage.getItem('id'))
			.then((response) => {
				setHeader({ ...values, name: response.data.name })
				setOrders(response.data.order);
			});
		setTimeout(() => {
			setOpen(false);
		}, 3000);
	}, [transfer, values]);

	const handleChange = (prop) => (event) => {
		const value = event.target.value;
		setValues({ ...values, [prop]: value });
		setError((prev) => {
			const stateObj = { ...prev, [prop]: '' };

			switch (prop) {
				case 'name':
					if (!value) {
						stateObj[prop] = 'error';
					}
					break;
				case 'comment':
					if (!value) {
						stateObj[prop] = 'error';
					}
					break;
				default:
					break;
			}
			return stateObj;
		});
	};

	const generateOrder = () => {
		var orderList = orders

		if (orders.length > 10) {
			orderList = orders.splice(orders.length-10,)
		}

		orderList.map((item) => {
			return (
				<ListButton>
					<Typography sx={{fontSize:'12px'}}>
						{'Recipe: '+item.recipe}
					</Typography>
					<Typography sx={{fontSize:'12px'}}>
						{'Store: ' +item.store}
					</Typography>
				</ListButton>
			);
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
		if (
			validateError() &&
			values.name.length !== 0 &&
			values.comment.length !== 0
		) {
			axios
				.post('http://localhost:8080/feedback/create', {
					email: sessionStorage.getItem('id'),
					name: values.name,
					comment: values.comment,
				})
				.then(() => {
					navigate('/home', {
						state: {
							message: 'Successfully submit for feedback.',
							type: 'success',
						},
					});
					window.location.reload(true);
				});
		} else {
			navigate('/home', {
				state: {
					message: 'One or more inputs were empty.',
					type: 'error',
				},
			});
			window.location.reload(true);
		}
	};

	return (
		<div className='body'>
			<Typography
				variant='h3'
				sx={{
					textAlign: 'center',
					mt: '3.5rem',
					position: 'absolute',
				}}
			>
				Welcome back, {header.name}!
			</Typography>
			<Box
				sx={{
					width: 100,
					height: 100,
				}}
			>
			</Box>
			<Box>
				<Box
					sx={{
						bgcolor: '#5f7470',
						height: '60vh',
						width: '39vh',
						borderRadius: '16px',
						border: '1px solid',
						borderColor: 'white',
						mt: '19vh',
						mr: '3vh',
					}}
				>
					<Box
						sx={{
							textAlign: 'center',
							alignContent: 'center',
							fontSize: '22px',
							mt: '1rem',
						}}
					>
						FEEDBACK
					</Box>
					<Box
						sx={{
							bgcolor: '#2E3837',
							height: '52.7vh',
							width: '39vh',
							borderBottomLeftRadius: '15px',
							borderBottomRightRadius: '15px',
							borderColor: 'white',
							mt: '1.8rem',
						}}
						onSubmit={handleSubmit(onSubmit)}
					>
						<form>
							<FormControl
								sx={{
									mt: '.5rem',
									ml: '3.75rem',
									width: '27.5vh',
								}}
							>
								<p className='feedBack-form-label'>NAME</p>
								<OutlinedInput
									className='home-input'
									placeholder='Enter Name'
									type={'name'}
									value={values.name}
									onChange={handleChange('name')}
								></OutlinedInput>
							</FormControl>
							<FormControl
								sx={{
									ml: '3.75rem',
									width: '27.5vh',
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
								></TextField>
							</FormControl>
							<Button
								sx={{
									bgcolor: '#5f7470',
									color: 'white',
									'&:hover': { backgroundColor: '#495A57' },
									width: '15vh',
									ml: '12.5vh',
									mt: '3vh',
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
					width: '40vh',
					borderRadius: '16px',
					border: '1px solid',
					borderColor: 'white',
					mt: '19vh',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Box
					sx={{
						textAlign: 'center',
						alignContent: 'center',
						fontSize: '22px',
						mt: '1rem',
						mb: '-.4rem'
					}}
				>
					ORDER HISTORY
				</Box>
				<Box
					sx={{
						bgcolor: '#2E3837',
						height: '52.7vh',
						width: '40vh',
						borderRadius: '16px',
						borderTopLeftRadius: '0',
						borderTopRightRadius: '0',
						mt: '3.5vh',
						display: 'flex',
						flexDirection: 'column',
						overflow: 'hidden',
						overflowY: 'scroll',
					}}
				>
					{generateOrder()}
				</Box>
			</Box>
			<div className='alert-body'>
				<Collapse
					in={open && transfer.state.message && transfer.state.type}
				>
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
