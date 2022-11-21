import MenuIcon from '@mui/icons-material/Menu';
import {
	AppBar,
	Box, Button, IconButton, Toolbar, Typography
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../-Login.js';
import Popup from '../Popup.js';

function NavigationBar() {
	const [openPopup, setOpenPopup] = useState(false);
	const navigate = useNavigate();

	const loginProps = () => {
		var loggedIn = sessionStorage.getItem("id")
		return {
			route: (sessionStorage.getItem("id"))?'/home':'/login',
			dis: (sessionStorage.getItem("id"))?'signout':'login',
		}
	}

	return (
		<AppBar
			position='static'
			sx={{ bgcolor: '#788c7c' }}
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
							navigate('/search');
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
					sx={{"&:hover":{bgcolor: '#5b6b5e'}}}
					color='inherit'
					onClick={() => 
						(sessionStorage.getItem("id"))?navigate('/'):navigate('/login')
					}
				>
					{(sessionStorage.getItem("id"))?'signout':'login'}
				</Button>
				{/* <Popup
					title={'Login'}
					openPopup={openPopup}
					setOpenPopup={setOpenPopup}
					color='inherit' 
					
				>
					<Login/>
				</Popup> */}
			</Toolbar>
		</AppBar>
	);
}

export default NavigationBar;
