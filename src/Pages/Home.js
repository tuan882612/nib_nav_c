import '../Assets/Styles/Home.css';
import { Box, Container } from '@mui/material';
import Map from './Search';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import CheckSession from '../utils/UserUtilities';

import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';

function Home() {
	const transfer = useLocation();
	const [open, setOpen] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setOpen(false);
		}, 3000);
	}, []);

	return (
		<div className='body'>
			<h3 className='home-header'>
				Home
			</h3>
			<Box 
				sx={{
					bgcolor: '#5f7470', 
					height: '60vh',
					width:'40vh',
					borderRadius: '16px',
					border: '1px solid',
					borderColor: 'white',
					mt:25,
					mr:15
				}}
			>
				<p className='feedback-header'>
					feedback
				</p>
				<Box
					sx={{
						bgcolor: '#2E3837', 
						height: '52vh',
						width:'39.9vh',
						borderBottomLeftRadius: '15px',
						borderBottomRightRadius: '15px',
						border: '1px solid',
						borderColor: 'white',
					}}
				>
					
				</Box>
			</Box>
			<Box 
				sx={{ 
					bgcolor: '#5f7470', 
					height: '60vh',
					width:'30vh',
					borderRadius: '16px',
					border: '1px solid',
					borderColor: 'white',
					mt:25,
				}} 
			>
				hi
			</Box>
			<div className='alert-body'>
				<Collapse in={open && transfer.state.message}>
					<Alert
						sx={{
							mb: 2,
							width: '100%',
						}}
					>
						{transfer.state.message}
					</Alert>
				</Collapse>
			</div>
		</div>
	);
}

export default Home;
