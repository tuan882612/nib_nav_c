import React, { useState } from 'react';
import {
	Menu,
	MenuItem,
	Checkbox,
	Box,
	Button,
	InputBase,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FilterListIcon from '@mui/icons-material/FilterList';

const StyledBox = styled(Box)(() => ({
	backgroundColor: 'white',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	border: '2px',
	borderStyle: 'solid',
	borderColor: 'black',
	borderRadius: '12px',
	color: 'black',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `${theme.spacing(2)}`,
	},
	margin: '10px',
}));

function Search() {
	const [value, setValue] = useState('');
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
		console.log(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
		console.log(anchorEl);
	};

	return (
		<StyledBox>
			<Box>
				<StyledInputBase
					placeholder='Search...'
					inputProps={{ 'aria-label': 'search' }}
					onChange={(event) => {
						setValue(event.target.value);
						console.log(value);
					}}
				/>
				<Button
					startIcon={<FilterListIcon />}
					aria-controls='simple-menu'
					aria-haspopup='true'
					onClick={handleClick}
				>
					Filter
				</Button>
				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClick={handleClose}
				>
					<Checkbox onClose={handleClose}>Snacks</Checkbox>
					<MenuItem onClick={handleClose}>Drinks</MenuItem>
				</Menu>
			</Box>
		</StyledBox>
	);
}

export default Search;
