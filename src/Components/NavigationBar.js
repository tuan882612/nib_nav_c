import {
	IconButton,
	Button,
	Typography,
	Toolbar,
	AppBar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Search from './Search';

function NavigationBar() {
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
				<Link to='/login' style={{textDecoration:'none', color: 'white'}}>
					<Button color='inherit'>Login</Button>
				</Link>
			</Toolbar>
		</AppBar>
	);
}

export default NavigationBar;
