import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

//Make one Container to switch between restuants and results

const StyledBox = styled(Box)(() => ({
	width: '20rem',
	height: '33rem',
	color: 'black',
	backgroundColor: 'white',
	marginLeft: '5rem',
	
    mb: 2,
	display: 'flex',
	flexDirection: 'column',
	overflow: 'hidden',
	overflowY: 'scroll',
}));

function Restaurants() {
	return (
		<div className='meow'>
			<StyledBox>
				{Array.from(Array(15)).map((_, index) => (
					<Button>
                        index
                    </Button>
				))}
			</StyledBox>
		</div>
	);
}

export default Restaurants;
