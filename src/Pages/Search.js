import '../Assets/Styles/Search.css';
import { useState, useMemo, useRef, useEffect } from 'react';
import {
	GoogleMap,
	useLoadScript,
	MarkerF,
	Autocomplete,
} from '@react-google-maps/api';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import {
	Box,
	InputBase,
	Icon,
	Button,
	Tabs,
	Tab,
	Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';
import CheckSession from '../utils/UserUtilities';

const StyledBox = styled(Box)(() => ({
	display: 'flex',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'white',
	'& .MuiInputBase-input': {
		margin: theme.spacing('0.5rem', '0.1rem'),
	},
}));

const StyledButton = styled(Button)(() => ({
	backgroundColor: '#788c7c',
	color: 'white',
	'&:hover': { backgroundColor: '#5b6b5e' },
}));

const StyledRestaurant = styled(Box)(() => ({
	width: '20rem',
	height: '30rem',
	color: 'black',
	backgroundColor: '#212529',
	mb: 2,
	display: 'flex',
	flexDirection: 'column',
	overflow: 'hidden',
	overflowY: 'scroll',
	marginLeft: '9rem',
}));

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

const libraries = ['places', 'directions'];

function Search() {
	const [token, setToken] = useState('');
	const [map, setMap] = useState(null);
	const [latitude, setLatitude] = useState(32.731);
	const [longitude, setLongitude] = useState(-97.115);
	const [location, setLocation] = useState('');
	const [prices, setPrices] = useState([]);
	const [recipe, setRecipe] = useState('');
	const [selectedRecipe, setSelectedRecipe] = useState([]);
	const [recipeList, setRecipeList] = useState([]);
	const [ingredients, setIngredients] = useState(['butter', 'milk', 'sugar']);
	const [stores, setStores] = useState([]);
	const [selectedStore, setSelectedStore] = useState([]);
	const [tab, setTab] = useState(0);

	const center = useMemo(
		() => ({ lat: latitude, lng: longitude }),
		[latitude, longitude]
	);

	const handleChange = (event, newValue) => {
		setTab(newValue);
		console.log(tab);
	};

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
		if (location !== '' && recipe !== '') {
			try {
				getGeocode(location).then((results) => {
					const { lat, lng } = getLatLng(results[0]);
					setLatitude(lat);
					setLongitude(lng);

					if (recipeList.length === 0) {
						setTab(0);
						console.log(tab);
					}
					// axios
					// 	.get(
					// 		`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&query=${recipe}&number=10`
					// 	)
					// 	.then((response) => {
					// 		setRecipeList(response.data.results);
					// 		console.log(response);
					// 	});

					console.log('Bearer ' + token);

					axios
						.get(
							`https://api-ce.kroger.com/v1/locations?filter.latLong.near=${lat},${lng}&filter.chain=Kroger&filter.radiusInMiles=5`,
							{
								headers: {
									Accept: 'application/json',
									Authorization: 'Bearer ' + token,
								},
							}
						)
						.then((response) => {
							setStores(response.data.data);
							console.log(stores);
						});
				});
			} catch (error) {
				console.log('Error: ', error);
			}
		}
	}, [location, map]);

	useEffect(() => {
		// axios
		// 	.get(
		// 		`https://api.spoonacular.com/recipes/${selectedRecipe.id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&includeNutrition=false`
		// 	)
		// 	.then((response) => {
		// 		setIngredients(response.data.extendedIngredients);
		//		if(selectedStore === '')
		// {
		// 	setTab(1);
		// }
		// 		console.log(ingredients);
		// 	});
	}, [selectedRecipe]);

	// useEffect(() => {
	// 	setPrices([]);
	// 	ingredients.map((ingredient) => {
	// 		axios
	// 			.get(
	// 				`https://api-ce.kroger.com/v1/products?filter.term=${ingredient.nameClean}&filter.locationId=03500817`,
	// 				{
	// 					headers: {
	// 						Accept: 'application/json',
	// 						Authorization: 'Bearer ' + token,
	// 					},
	// 				}
	// 			)
	// 			.then((response) => {
	// 				for (let i = 0; i < response.data.data.length; i++) {
	// 					if (
	// 						response.data.data[i].items[0].hasOwnProperty(
	// 							'price'
	// 						)
	// 					) {
	// 						setPrices((prices) => [
	// 							...prices,
	// 							response.data.data[i].items[0].price.regular,
	// 						]);
	// 						console.log(
	// 							response.data.data[i].items[0].price.regular
	// 						);
	// 						break;
	// 					}
	// 				}
	// 				console.log(prices);
	// 				console.log(response);
	// 			});
	// 	});

	// 	console.log(prices);
	// }, [ingredient]);

	useEffect(() => {
		if (selectedStore !== '' && ingredients !== []) {
			setPrices([]);
			ingredients.map((ingredient) => {
				axios
					.get(
						`https://api-ce.kroger.com/v1/products?filter.term=${ingredient}&filter.locationId=${selectedStore.locationId}`,
						{
							headers: {
								Accept: 'application/json',
								Authorization: 'Bearer ' + token,
							},
						}
					)
					.then((response) => {
						for (let i = 0; i < response.data.data.length; i++) {
							if (
								response.data.data[i].items[0].hasOwnProperty(
									'price'
								)
							) {
								setPrices((prices) => [
									...prices,
									response.data.data[i].items[0].price
										.regular,
								]);
								break;
							}
						}
					});
			});
			
			setTab(2);
			console.log(prices);
		}
	}, [selectedStore, ingredients]);

	if (!isLoaded) return <div className='body'></div>;

	return (
		<div className='body'>
			<div className='mid-body'>
				<Box sx={{ display: 'inline-flex' }}>
					<Box sx={{ marginRight: '50px' }}>
						<GoogleMap
							onLoad={(map) => {
								setMap(map);
							}}
							zoom={12}
							center={center}
							mapContainerClassName='map-container'
							options={{
								streetViewControl: false,
								mapTypeControl: false,
							}}
						>
							<MarkerF position={center} />
							{stores.map((item) => {
								return (
									<MarkerF
										position={{
											lat: item.geolocation.latitude,
											lng: item.geolocation.longitude,
										}}
									/>
								);
							})}
						</GoogleMap>
					</Box>
					<Box
						sx={{
							width: '40rem',
							justifyContent: 'center',
							alignItems: 'center',
							display: 'inline-block',
							backgroundColor: '#818284',
							height: '45rem',
							borderRadius: '20px',
						}}
					>
						<StyledBox
							sx={{
								display: 'flex',
								justifyContent: 'space-around',
								border: 'none',
								width: '40rem',
								marginTop: '20px',
								marginBottom: '20px',
							}}
						>
							<StyledBox
								sx={{
									background: '#212529',
									borderRadius: '5px',
								}}
							>
								<Icon
									sx={{
										p: '10px',
										color: 'white',
										height: '0.65rem',
									}}
								>
									<SearchIcon></SearchIcon>
								</Icon>
								<Autocomplete>
									<StyledInputBase
										sx={{ width: '15rem' }}
										id='address'
										inputProps={{
											maxLength: 50,
											placeholder: 'Current Location',
										}}
									></StyledInputBase>
								</Autocomplete>
							</StyledBox>
							<StyledBox
								sx={{
									background: '#212529',
									borderRadius: '5px',
								}}
							>
								<Icon
									sx={{
										p: '10px',
										color: 'white',
										height: '0.65rem',
									}}
								>
									<SearchIcon></SearchIcon>
								</Icon>
								<StyledInputBase
									sx={{ width: '10rem' }}
									id='recipe'
									inputProps={{
										maxLength: 50,
										placeholder: 'Enter Recipe',
									}}
								></StyledInputBase>
							</StyledBox>
							<StyledButton
								sx={{
									border: 'solid',
								}}
								onClick={async () => {
									let address = {
										address:
											document.getElementById('address')
												.value,
									};
									setLocation(address);
									setRecipe(
										document.getElementById('recipe').value
									);
								}}
							>
								Submit
							</StyledButton>
						</StyledBox>
						<Box
							sx={{
								display: 'inline-block',
								justifyContent: 'space-evenly',
								alignItems: 'center',
								ml: '12rem',
								backgroundColor: '#788c7c',
								border: 'solid',
							}}
						>
							<Tabs
								value={tab}
								onChange={handleChange}
								textColor='white'
								TabIndicatorProps={{
									style: {
										backgroundColor: 'black',
									},
								}}
							>
								<Tab
									label='Recipes'
									{...(<div>yo</div>)}
								/>
								<Tab label='Store' />
								<Tab label='Price' />
							</Tabs>
						</Box>
						<TabPanel
							value={tab}
							index={0}
						>
							{
								<StyledRestaurant>
									{recipeList.map((item) => {
										return (
											<Button
												onClick={() => {
													setSelectedRecipe(item);
													console.log(selectedRecipe);
												}}
											>
												{item.title}
											</Button>
										);
									})}
								</StyledRestaurant>
							}
						</TabPanel>
						<TabPanel
							value={tab}
							index={1}
						>
							{
								<StyledRestaurant>
									{stores.map((item) => {
										return (
											<Button
												onClick={() => {
													setSelectedStore(item);
													console.log(selectedStore);
												}}
											>
												{item.name}
											</Button>
										);
									})}
								</StyledRestaurant>
							}
						</TabPanel>
						<TabPanel
							value={tab}
							index={2}
						>
							{
								<StyledRestaurant>
									{prices.map((item) => {
										return <Button>{item}</Button>;
									})}
								</StyledRestaurant>
							}
						</TabPanel>
					</Box>
				</Box>
			</div>
		</div>
	);
}

export default Search;
