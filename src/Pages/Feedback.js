import '../Assets/Styles/Feedback.css';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Pause } from '@mui/icons-material';
import SelectInput from '@mui/material/Select/SelectInput';

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
			<form
				onSubmit={() => {
					// setName(nameRef.current.value);
					// setEmail(emailRef.current.value);
					// setComment(commentRef.current.value);
					sendFeedback();
					return false;
				}}
				className='inputs'
			>
				<div className='name'>
					Name:{' '}
					<input
						type='text'
						ref={nameRef}
					></input>
				</div>
				<div className='email'>
					Email:{' '}
					<input
						type='email'
						ref={emailRef}
					></input>
				</div>
				<div className='comment'>
					Comment:{' '}
					<textarea
						type='text'
						ref={commentRef}
					></textarea>
				</div>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
}

export default Feedback;
