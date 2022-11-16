import '../Assets/Styles/Map.css';
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

const StyledBox = styled(Box)(() => ({
	border: '2px',
	borderStyle: 'solid',
	borderColor: 'white',
	display: 'flex',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'white',
	width: '22rem',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
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

function Map() {
	const [map, setMap] = useState(null);
	const [results, setResults] = useState([]);
	const [latitude, setLatitude] = useState(32.731);
	const [longitude, setLongitude] = useState(-97.115);
	const [originLocation, setOriginLocation] = useState('');
	const [destinationLocation, setDestinationLocation] = useState('');
	const originRef = useRef(null);
	const destinationRef = useRef(null);

	const center = useMemo(
		() => ({ lat: latitude, lng: longitude }),
		[latitude, longitude]
	);

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries: libraries,
	});

	useEffect(() => {
		if (destinationLocation !== '') {
			const data = {
				aud: 'doordash',
				iss: process.env.REACT_APP_DOORDASH_DEVELOPER_ID,
				kid: process.env.REACT_APP_DOORDASH_KEY_ID,
				exp: Math.floor(Date.now() / 1000 + 60),
				iat: Math.floor(Date.now() / 1000),
			};

			const headers = {
				algorithm: 'HS256',
				header: { 'dd-ver': 'DD-JWT-V1' },
			};
		}
	}, [destinationLocation]);

	useEffect(() => {
		if (originLocation !== '') {
			try {
				getGeocode(originLocation).then((results) => {
					const { lat, lng } = getLatLng(results[0]);
					setLatitude(lat);
					setLongitude(lng);

					let service = new window.google.maps.places.PlacesService(
						map
					);

					let request = {
						location: { lat, lng },
						radius: 2000,
						type: ['meal_delivery'],
					};

					service.nearbySearch(request, (results, status) => {
						if (
							status ===
							window.google.maps.places.PlacesServiceStatus.OK
						) {
							setResults(results);
							console.log(results);
						}
					});
				});
			} catch (error) {
				console.log('Error: ', error);
			}
		}
	}, [originLocation, map]);

	if (!isLoaded) return <div>Load...</div>;

	return (
		<Box sx={{ display: 'inline-flex' }}>
			<Box>
				<StyledBox>
					<Icon
						sx={{ p: '10px', color: 'white', height: '0.65rem' }}
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
					{results.map((restaurant) => (
						<MarkerF
							position={restaurant.geometry.location}
						></MarkerF>
					))}
				</GoogleMap>
			</Box>
			<Box sx={{ marginLeft: '5rem' }}>
				<StyledBox>
					<Icon
						sx={{ p: '10px', color: 'white', height: '0.65rem' }}
						aria-label='search'
					>
						<SearchIcon />
					</Icon>
					<Autocomplete>
						<StyledInputBase
							ref={destinationRef}
							inputProps={{
								maxLength: 50,
								placeholder: 'Destination Location',
							}}
							onKeyPress={(event) => {
								if (event.key === 'Enter') {
									setDestinationLocation(event.target.value);
								}
							}}
						></StyledInputBase>
					</Autocomplete>
				</StyledBox>
				<StyledRestaurant>
					{results.map((restaurant) => (
						<Button
							onClick={() => {
								setDestinationLocation(restaurant.vicinity);
							}}
						>
							{restaurant.name}
						</Button>
					))}
				</StyledRestaurant>
			</Box>
		</Box>
	);
}

export default Map;
