import React, { useState } from 'react';
import {
	Box,
	InputBase,
    Icon
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	border: '2px',
	borderStyle: 'solid',
	borderColor: 'white',
	borderRadius: '12px',
	color: 'white',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `${theme.spacing(2)}`,
	},
	margin: '10px',
}));

function Search() {
	const [value, setValue] = useState('');

	return (
		<Box>
            <Icon>

            </Icon>
			<StyledInputBase
				placeholder='Search...'
				inputProps={{ 'aria-label': 'search' }}
				onChange={(event) => {
					setValue(event.target.value);
					console.log(value);
				}}
			/>
		</Box>
	);
}

export default Search;
