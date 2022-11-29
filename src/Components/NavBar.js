import MenuIcon from '@mui/icons-material/Menu';
import {
	AppBar,
	Box, 
	Button, 
	IconButton, 
	Toolbar, 
	Typography
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function NavigationBar() {
    const [session, setSession] = useState(false)
	const navigate = useNavigate();
    const location = useLocation();
	const sUrl = 'http://localhost:8080'
	const curId = sessionStorage.getItem('id')

	useEffect(() => {
		if (sessionStorage.getItem('login')==='true') {
			axios.get(sUrl + "/verify/" + curId)
			.then((response) => setSession(true))
			.catch((error) => {
				if (sessionStorage.getItem('login')==='true')
				{
					navigate('/login')
				}
				sessionStorage.setItem('login', 'false');
				sessionStorage.setItem('id', '');
			})
		}
	},[navigate, location, curId, session, setSession]);

	const logButton = () => {
		return (
			(sessionStorage.getItem('login') === 'true')?
				<Button
					sx={{"&:hover":{bgcolor: '#5b6b5e'}}}
					color='inherit'
					onClick={() => {
						axios.delete(sUrl + "/delete/" + curId)
						sessionStorage.setItem("login", 'false')
						sessionStorage.setItem("id", "")
						navigate('/login')
					}}
				>
					Sign Out
				</Button>:
				// <Box/>
				<Button
					sx={{"&:hover":{bgcolor: '#5b6b5e'}}}
					color='inherit'
					onClick={() => navigate('/login')}
				>
					Login
				</Button>
		)
	}
	
	const navIcon = () => {
		var i = 0
		const navItems = ['home','search','feedback','profile']
			.map((route) => 
				<Typography
					key={i++}
					variant='h6'
					component='div'
					sx={{ cursor: 'pointer' }}
					onClick={() => navigate('/'+route)}
				>
					{route}
				</Typography>
		)

		return (
			(sessionStorage.getItem('login') === 'true')?
				<Box
					sx={{
						flexGrow: 0.1,
						display: 'inline-flex',
						justifyContent: 'space-between',
					}}
				>
					{navItems}
				</Box>: 
				<Box/>
		)
	}

	return (
		<AppBar position='static' sx={{ bgcolor: '#788c7c' }}>
			<Toolbar 
				sx={{
					justifyContent: 'space-between', 
					display: 'flex' 
				}}
			>
				{navIcon()}
				{logButton()}
			</Toolbar>
		</AppBar>
	);
}

export default NavigationBar;
