import '../Assets/Styles/Home.css';
import { Box } from '@mui/material';
import Map from './Search';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CheckSession from '../utils/UserUtilities';

function Home() {
	return (
		<div className='body'>
			<div className='mid-body'>Home</div>
		</div>
	);
}

export default Home;
