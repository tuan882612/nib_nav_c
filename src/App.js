import './Assets/Styles/App.css';
import NavigationBar from './Components/NavigationBar';
import {Box} from '@mui/material';

export default function App() {
  return (
		<div className='Body'>
			<Box sx={{ flexGrow: 1 }}>
				<NavigationBar />
			</Box>
		</div>
  );
}