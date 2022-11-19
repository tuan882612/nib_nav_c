import '../Assets/Styles/Feedback.css';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Pause } from '@mui/icons-material';
import SelectInput from '@mui/material/Select/SelectInput';

const baseURL = 'tuan';
const regex = /^[^s@]+@[^s@]+.[^s@]+$/;

function Feedback() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [comment, setComment] = useState('');
	const nameRef = useRef(null);
	const emailRef = useRef(null);
	const commentRef = useRef(null);

	const sendFeedback = () => {
		if (name !== '' && email !== '' && comment !== '') {
			const feedback = {
				name: name,
				email: email,
				comment: comment,
			};

			// axios.post(baseURL, feedback).then((response) => {
			// 	console.log(response);
			// });
		}
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
			Feedback
			<form
				onSubmit={() => {
					setName(nameRef.current.value);
					setEmail(emailRef.current.value);
					setComment(commentRef.current.value);
					sendFeedback();
				}}
				className='inputs'
			>
				Name:{' '}
				<input
					type='text'
					ref={nameRef}
				></input>
				Email:{' '}
				<input
					type='email'
					ref={emailRef}
				></input>
				Comment:{' '}
				<input
					type='text'
					ref={commentRef}
				></input>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
}

export default Feedback;
