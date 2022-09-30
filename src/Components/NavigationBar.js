import {useState} from 'react'
import { IconButton, Button, Typography, Toolbar, AppBar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Search from './Search';
import Popup from './Popup.js'
import Login from './Login.js'

function NavigationBar() {
	const [openPopup, setOpenPopup] = useState(false);

	return (
		<AppBar
			position='static'
			sx={{ bgcolor: 'orange' }}
		>
			<Toolbar>
				<IconButton
					size='large'
					edge='start'
					color='inherit'
					aria-label='menu'
					sx={{ mr: 2 }}
				>
					<MenuIcon />
				</IconButton>
				<Typography
					variant='h6'
					component='div'
					sx={{ flexGrow: 1 }}
				>
					Nib-Nav
				</Typography>
				<Search />
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
					{/* <Login></Login> */}
				</Popup>
			</Toolbar>
		</AppBar>
	);
}

export default NavigationBar;
