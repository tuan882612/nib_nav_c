import './Assets/Styles/App.css';
import { Box } from '@mui/material';
import NavigationBar from './Components/NavigationBar';
import Home from './Components/Map';

export default function App() {
	return (
		<div className='body'>
			<Box sx={{ flexGrow: 1 }}>
				<NavigationBar />
				<div className='mid-body'>
					<Home />
				</div>
			</Box>
		</div>
	);
}
