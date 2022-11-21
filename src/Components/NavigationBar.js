import { useState } from 'react';
import {
	IconButton,
	Button,
	Typography,
	Toolbar,
	AppBar,
	Box,
	autocompleteClasses,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Popup from './Popup.js';
import Login from './Login.js';

function NavigationBar() {
	const [openPopup, setOpenPopup] = useState(false);
	const navigate = useNavigate();

	return (
		<AppBar
			position='static'
			sx={{ bgcolor: 'orange' }}
		>
			<Toolbar sx={{ justifyContent: 'space-between', display: 'flex' }}>
				{/* <IconButton
					size='large'
					edge='start'
					color='inherit'
					aria-label='menu'
					sx={{ mr: 2 }}
				>
					<MenuIcon />
				</IconButton> */}
				<Box
					sx={{
						flexGrow: 0.2,
						display: 'inline-flex',
						justifyContent: 'space-between',
					}}
				>
					<Typography
						variant='h6'
						component='div'
						sx={{ cursor: 'pointer' }}
						onClick={() => {
							navigate('/');
						}}
					>
						Home
					</Typography>
					<Typography
						variant='h6'
						component='div'
						sx={{ cursor: 'pointer' }}
						onClick={() => {
							navigate('/map');
						}}
					>
						Search
					</Typography>
					<Typography
						variant='h6'
						component='div'
						sx={{ cursor: 'pointer' }}
						onClick={() => {
							navigate('/feedback');
						}}
					>
						Feedback
					</Typography>
					<Typography
						variant='h6'
						component='div'
						sx={{ cursor: 'pointer' }}
						onClick={() => {
							navigate('/profile');
						}}
					>
						Profile
					</Typography>
				</Box>
				<Button
					color='inherit'
					onClick={() => setOpenPopup(true)}
				>
					Login
				</Button>
				<Popup
					title={'Sign-In'}
					openPopup={openPopup}
					setOpenPopup={setOpenPopup}
					color='inherit'
				>
					<Login />
				</Popup>
			</Toolbar>
		</AppBar>
	);
}

export default NavigationBar;
