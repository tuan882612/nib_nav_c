import '../Assets/Styles/Home.css';
import { Box } from '@mui/material';
import Map from '../Components/Map';
import Feedback from '../Components/Feedback';
import Profile from '../Components/Profile';

function PreLogin() {
	return (
		<div className='body'>
			<Box sx={{ flexGrow: 1 }}>
				<div className='mid-body'>
					<Map />
					{/* <Feedback /> */}
					{/* <Profile /> */}
				</div>
			</Box>
		</div>
	);
}

export default PreLogin;
