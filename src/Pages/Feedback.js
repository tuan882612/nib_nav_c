import '../Assets/Styles/Feedback.css';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Pause } from '@mui/icons-material';
import SelectInput from '@mui/material/Select/SelectInput';
import {
	Button,
	FormControl,
	OutlinedInput,
	styled,
	TextField,
} from '@mui/material';
import { maxHeight, minHeight } from '@mui/system';

const StyledInput = styled(OutlinedInput)(() => ({
	backgroundColor: 'white',
	maxHeight: '30px',
}));

const createURL = 'http://localhost:8080/feedback/create';
const fetchURL = 'http://localhost:8080/feedback/get/';
const regex = /^[^s@]+@[^s@]+.[^s@]+$/;

function Feedback() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [comment, setComment] = useState('');
	const nameRef = useRef(null);
	const emailRef = useRef(null);
	const commentRef = useRef(null);

	const sendFeedback = () => {
		const feedback = {
			name: nameRef.current.value,
			email: emailRef.current.value,
			comment: commentRef.current.value,
		};

		axios.post(createURL, feedback).then((response) => {
			console.log(response);
		});
		// if (name !== '' && email !== '' && comment !== '') {
		// 	const feedback = {
		// 		name: nameRef.current.value,
		// 		email: emailRef.current.value,
		// 		comment: commentRef.current.value,
		// 	};

		// 	console.log(feedback);

		// 	axios.post(createURL, feedback).then((response) => {
		// 		console.log(response);
		// 	});
		// }
	};

	// useEffect(() => {
	// 	if (name !== '' && email !== '' && comment !== '') {
	// 		if (email.match(regex)) {
	// 			const feedback = {
	// 				name: name,
	// 				email: email,
	// 				comment: comment,
	// 			};

	// 			// axios.post(baseURL, feedback).then((response) => {
	// 			// 	console.log(response);
	// 			// });
	// 		}
	//         else
	//         {
	//             console.log("Bad Email!")
	//         }
	// 	}
	// }, [name, email, comment]);

	return (
		<div className='main-container'>
			<form className='inputs'>
				<FormControl>
					Name:
					<StyledInput type={'name'} />
				</FormControl>
				<FormControl>
					Email:
					<StyledInput type={'email'} />
				</FormControl>
				<FormControl>
					Comment:
					<TextField
						sx={{
							bgcolor: 'white',
							resize: 'none',
							borderRadius: 1,
						}}
						type={'comment'}
						multiline
						rows={3}
					/>
				</FormControl>
				<Button
					sx={{ bgcolor: '#788C7C', color: 'white' }}
					type='submit'
				>
					Submit
				</Button>
			</form>
		</div>
	);
}

export default Feedback;
