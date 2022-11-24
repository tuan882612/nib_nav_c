import '../Assets/Styles/Search.css';
import { useState, useMemo, useRef, useEffect } from 'react';
import {
	GoogleMap,
	useLoadScript,
	MarkerF,
	Autocomplete,
} from '@react-google-maps/api';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Box, InputBase, Icon, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import * as jose from 'jose';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';
import CheckSession from '../utils/UserUtilities';

const StyledBox = styled(Box)(() => ({
	border: '0.5px',
	borderStyle: 'solid',
	borderColor: 'white',
	display: 'flex',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'white',
	width: '22rem',
	'& .MuiInputBase-input': {
		margin: theme.spacing('0.5rem', '0.1rem'),
		// padding: theme.spacing(1, 1, 1, 0),
	},
}));

const StyledRestaurant = styled(Box)(() => ({
	width: '25rem',
	height: '30rem',
	color: 'black',
	backgroundColor: 'white',
	mb: 2,
	display: 'flex',
	flexDirection: 'column',
	overflow: 'hidden',
	overflowY: 'scroll',
}));

const libraries = ['places', 'directions'];

function Search() {
	const [map, setMap] = useState(null);
	const [results, setResults] = useState([]);
	const [latitude, setLatitude] = useState(32.731);
	const [longitude, setLongitude] = useState(-97.115);
	const [originLocation, setOriginLocation] = useState('');
	const [recipe, setRecipe] = useState('');
	const originRef = useRef(null);
	const recipeRef = useRef(null);

	const center = useMemo(
		() => ({ lat: latitude, lng: longitude }),
		[latitude, longitude]
	);

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries: libraries,
	});

	useEffect(() => {
		async function signToken() {
			// // might need to move token to avoid recalling it
			// const data = {
			// 	aud: 'doordash',
			// 	iss: process.env.REACT_APP_DOORDASH_DEVELOPER_ID,
			// 	kid: process.env.REACT_APP_DOORDASH_KEY_ID,
			// 	exp: Math.floor(Date.now() / 1000 + 60),
			// 	iat: Math.floor(Date.now() / 1000),
			// };

			// const headers = {
			// 	alg: 'HS256',
			// 	header: { 'dd-ver': 'DD-JWT-V1' },
			// };

			// const token = await new jose.SignJWT(data)
			// 	.setProtectedHeader(headers)
			// 	.setIssuedAt()
			// 	.setIssuer(process.env.REACT_APP_DOORDASH_DEVELOPER_ID)
			// 	.setAudience('doordash')
			// 	.sign(
			// 		Buffer.from(
			// 			process.env.REACT_APP_DOORDASH_SIGNING_SECRET,
			// 			'base64'
			// 		)
			// 	);

			// console.log(token);

			// const body = JSON.stringify({
			// 	external_delivery_id: 'D-12345',
			// 	pickup_address:
			// 		'901 Market Street 6th Floor San Francisco, CA 94103',
			// 	pickup_business_name: 'Wells Fargo SF Downtown',
			// 	pickup_phone_number: '+16505555555',
			// 	pickup_instructions: 'Enter gate code 1234 on the callbox.',
			// 	dropoff_address:
			// 		'901 Market Street 6th Floor San Francisco, CA 94103',
			// 	dropoff_business_name: 'Wells Fargo SF Downtown',
			// 	dropoff_phone_number: '+16505555555',
			// 	dropoff_instructions: 'Enter gate code 1234 on the callbox.',
			// 	order_value: 1999,
			// });

			// axios
			// 	.post(
			// 		'https://openapi.doordash.com/drive/v2/quotes',
			// 		body,
			// 		{
			// 			headers: {
			// 				Authorization: 'Bearer ' + token,
			// 				'Content-Type': 'application/json',
			// 			},
			// 		}
			// 	)
			// 	.then(function (response) {
			// 		console.log(response.data);
			// 	})
			// 	.catch(function (error) {
			// 		console.log(error);
			// 	});
			// axios
			// 	.get(
			// 		`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&query=pasta&maxFat=25&number=2`
			// 	)
			// 	.then((response) => {
			// 		setResults(response.data.results);
			// 		console.log(response);
			// 	});

			// console.log(process.env.REACT_APP_SPOONACULAR_API_KEY);
		}
		if (recipe !== '') {
			signToken();
		}
	}, [recipe]);

	useEffect(() => {
		if (originLocation !== '') {
			try {
				getGeocode(originLocation).then((results) => {
					const { lat, lng } = getLatLng(results[0]);
					setLatitude(lat);
					setLongitude(lng);

					// let service = new window.google.maps.places.PlacesService(
					// 	map
					// );

					// let request = {
					// 	location: { lat, lng },
					// 	radius: 2000,
					// 	type: ['meal_delivery'],
					// };

					// service.nearbySearch(request, (results, status) => {
					// 	if (
					// 		status ===
					// 		window.google.maps.places.PlacesServiceStatus.OK
					// 	) {
					// 		setResults(results);
					// 		console.log(results);
					// 	}
					// });
				});
			} catch (error) {
				console.log('Error: ', error);
			}
		}
	}, [originLocation, map]);

	if (!isLoaded) return <div className='body'></div>;

	return (
		<div className='body'>
			<div className='mid-body'>
				<Box sx={{ display: 'inline-flex' }}>
					<Box>
						<StyledBox>
							<Icon
								sx={{
									p: '10px',
									color: 'white',
									height: '0.65rem',
								}}
								aria-label='search'
							>
								<SearchIcon />
							</Icon>
							<Autocomplete>
								<StyledInputBase
									ref={originRef}
									inputProps={{
										maxLength: 50,
										placeholder: 'Current Location',
									}}
									onKeyPress={async (event) => {
										if (event.key === 'Enter') {
											let address = {
												address: event.target.value,
											};
											setOriginLocation(address);
										}
									}}
								></StyledInputBase>
							</Autocomplete>
						</StyledBox>
						<GoogleMap
							onLoad={(map) => {
								setMap(map);
							}}
							zoom={14}
							center={center}
							mapContainerClassName='map-container'
							options={{
								streetViewControl: false,
								mapTypeControl: false,
							}}
						>
							<MarkerF position={center} />
						</GoogleMap>
					</Box>
					<Box sx={{ marginLeft: '5rem' }}>
						<StyledBox>
							<Icon
								sx={{
									p: '10px',
									color: 'white',
									height: '0.65rem',
								}}
								aria-label='search'
							>
								<SearchIcon />
							</Icon>
							<Autocomplete>
								<StyledInputBase
									ref={recipeRef}
									inputProps={{
										maxLength: 50,
										placeholder: 'Enter Recipe',
									}}
									onKeyPress={(event) => {
										if (event.key === 'Enter') {
											setRecipe(event.target.value);
										}
									}}
								></StyledInputBase>
							</Autocomplete>
						</StyledBox>
						<StyledRestaurant>
							{results.map((item) => {
								return <div>{item.title}</div>;
							})}
						</StyledRestaurant>
					</Box>
				</Box>
			</div>
		</div>
	);
}

export default Search;
