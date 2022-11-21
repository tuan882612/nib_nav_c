import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Box, Button, IconButton, Toolbar, Typography
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../-Login.js';
import Popup from '../Popup.js';

function PreNavBar() {
	const [openPopup, setOpenPopup] = useState(false);
	const navigate = useNavigate();

	return (
		<AppBar
			position='static'
			sx={{ bgcolor: '#788c7c' }}
		>
			<Toolbar sx={{ justifyContent: 'space-between', display: 'flex' }}>
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
					title={'Login'}
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

export default PreNavBar;
