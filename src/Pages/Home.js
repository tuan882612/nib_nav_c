import '../Assets/Styles/Home.css';
import { Box } from '@mui/material';
import Map from './Search';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CheckSession from '../utils/UserUtilities';

import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

function Home() {
	const transfer = useLocation();
	const [open, setOpen] = useState(true);

	useEffect(() => {
		setTimeout(() => {
		    setOpen(false);
		}, 3000);
	},[])

	return (
		<div className='body'>
			<div className='mid-body'>Home</div>
			<div className='alert-body'>
				<Collapse in={open && transfer.state} >
					<Alert
						sx={{ 
							mb: 2,
							width: '100%' 
						}}
					>
						{}
					</Alert>
				</Collapse>
			</div>
		</div>
	);
}

export default Home;
