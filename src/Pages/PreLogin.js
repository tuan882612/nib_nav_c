import '../Assets/Styles/Home.css';
import { Box } from '@mui/material';
import Map from '../Components/Map';
import Restaurants from '../Components/Restaurants';
import Search from '../Components/Search';

function PreLogin() {
	return (
		<div className='body'>
			<Box sx={{ flexGrow: 1 }}>
				<div className='mid-body'>
					<Box>
						<Search/>
						<Map />
					</Box>
					<Restaurants />
				</div>
			</Box>
		</div>
	);
}

export default PreLogin;