import '../Assets/Styles/Search.css';
import { useState, useMemo, useRef, useEffect } from 'react';
import {
	GoogleMap,
	useLoadScript,
	MarkerF,
	Autocomplete,
} from '@react-google-maps/api';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Box, InputBase, Icon} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
// import * as jose from 'jose';
import { Buffer } from 'buffer';

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
	const [token, setToken] = useState('');
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
		const data = {
			grant_type: 'client_credentials',
			scope: 'product.compact',
		};

		axios
			.post('https://api-ce.kroger.com/v1/connect/oauth2/token', data, {
				headers: {
					Authorization:
						'Basic ' +
						Buffer.from(
							`${process.env.REACT_APP_KROGER_CLIENT_ID}:${process.env.REACT_APP_KROGER_SIGNING_SECRET}`
						).toString('base64'),
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			})
			.then((response) => {
				console.log(response);
				setToken(response.data.access_token);
			});
	}, []);

	useEffect(() => {
		if (originLocation !== '') {
			try {
				getGeocode(originLocation).then((results) => {
					const { lat, lng } = getLatLng(results[0]);
					setLatitude(lat);
					setLongitude(lng);

					console.log('Bearer ' + token);

					axios
						.get(
							'https://api-ce.kroger.com/v1/locations?filter.zipCode.near=75052&filter.chain=Kroger',
							{
								headers: {
									Accept: 'application/json',
									Authorization: 'Bearer ' + token,
								},
							}
						)
						.then((response) => {
							console.log(response);
						});

					axios
						.get(
							'https://api-ce.kroger.com/v1/products?filter.term=milk&filter.locationId=03500817',
							{
								headers: {
									Accept: 'application/json',
									Authorization: 'Bearer ' + token,
								},
							}
						)
						.then((response) => console.log(response));
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
