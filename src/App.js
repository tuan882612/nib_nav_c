import './Assets/Styles/App.css';
import {Box} from '@mui/material';
import NavigationBar from './Components/NavigationBar';

export default function App() {
  return (
		<div className='Body'>
			<Box sx={{ flexGrow: 1 }}>
				<NavigationBar />
				<div className='mid_body'>
					
				</div>
			</Box>
		</div>
  );
}