import React, { useState } from 'react';
import { Box, InputBase, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const StyledBox = styled(Box)(() => ({
	border: '2px',
	borderStyle: 'solid',
	borderColor: 'white',
	borderRadius: '12px',
	marginRight: '10px',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'white',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `${theme.spacing(2)}`,
	},
}));

function Search() {
	const [value, setValue] = useState('');
	const [clicked, setClicked] = useState(null);

	return (
		<StyledBox>
			<StyledInputBase
				placeholder='Search...'
				inputProps={{ 'aria-label': 'search', maxLength: 100 }}
				onChange={(event) => {
					setValue(event.target.value);
					console.log(value);
				}}
				onKeyPress={(e) => {
					if (e.key === 'Enter') {
                        //Change to take search and redirect
                        setClicked(e.target.value)
						console.log('meow');
					}
				}}
			>
				<IconButton
					type='button'
					sx={{ p: '10px', color: 'white' }}
					aria-label='search'
				>
					<SearchIcon />
				</IconButton>
			</StyledInputBase>
			<IconButton
				type='button'
				sx={{ p: '10px', color: 'white' }}
				aria-label='search'
			>
				<SearchIcon />
			</IconButton>
		</StyledBox>
	);
}

export default Search;
