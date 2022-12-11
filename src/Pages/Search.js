import '../Assets/Styles/Search.css';
import { useState, useMemo, useEffect } from 'react';
import {
	GoogleMap,
	useLoadScript,
	MarkerF,
	Autocomplete,
	InfoBox,
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
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

const StyledBox = styled(Box)(() => ({
	display: 'flex',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'white',
	'& .MuiInputBase-input': {
		margin: theme.spacing('0.5rem', '0.1rem'),
		color: 'white',
		backgroundColor: '#212529',
	},
}));

const StyledButton = styled(Button)(() => ({
	backgroundColor: '#2E3837',
	color: 'white',
	'&:hover': { backgroundColor: '#483C33' },
}));

const ListButton = styled(Button)(() => ({
	backgroundColor: '#2E3837',
	borderRadius: '0',
	padding: '20px',
	borderBottom: 'solid',
	borderWidth: '1px',
	color: 'white',
	'&:hover': { backgroundColor: '#483C33' },
}));

const StyledRestaurant = styled(Box)(() => ({
	width: '30rem',
	height: '30rem',
	color: 'black',
	backgroundColor: '#212529',
	mb: 2,
	display: 'flex',
	flexDirection: 'column',
	overflow: 'hidden',
	overflowY: 'scroll',
	marginLeft: '3.5rem',
	border: 'solid',
	borderWidth: '1px',
	borderColor: 'black',
}));

const StyledReceipt = styled(Box)(() => ({
	width: '30rem',
	height: '30rem',
	color: 'black',
	backgroundColor: 'white',
	mb: 2,
	display: 'flex',
	flexDirection: 'column',
	overflow: 'hidden',
	overflowY: 'scroll',
	marginLeft: '3.5rem',
	border: 'solid',
	borderWidth: '1px',
	borderColor: 'black',
	justifyContent: 'center',
	alignItems: 'center',
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

const bcolor = '#2E3837';
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
	const [ingredients, setIngredients] = useState([]);
	const [stores, setStores] = useState([]);
	const [selectedStore, setSelectedStore] = useState([]);
	const [tab, setTab] = useState(0);
	const [cost, setCost] = useState(0);

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

		setTab(0);

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

					setTab(0);

					axios
						.get(
							`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&query=${recipe}&number=15`
						)
						.then((response) => {
							setRecipeList(response.data.results);
							console.log(response);
						});

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
		if (selectedRecipe !== [] && selectedRecipe !== undefined) {
			axios
				.get(
					`https://api.spoonacular.com/recipes/${selectedRecipe.id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&includeNutrition=false`
				)
				.then((response) => {
					setIngredients(response.data.extendedIngredients);
					setSelectedStore([]);
					console.log(ingredients);
				});
		}
	}, [selectedRecipe]);

	useEffect(() => {
		if (
			selectedStore !== [] &&
			ingredients !== [] &&
			selectedRecipe !== undefined &&
			ingredients !== undefined &&
			selectedStore !== undefined &&
			selectedStore.locationId !== undefined
		) {
			setPrices([]);
			setCost(0);
			let arr = [];
			ingredients.map((ingredient) => {
				axios
					.get(
						`https://api-ce.kroger.com/v1/products?filter.term=${ingredient.nameClean}&filter.locationId=${selectedStore.locationId}`,
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
								) &&
								arr.length < ingredients.length
							) {
								arr.push(
									response.data.data[i].items[0].price.regular
								);
								setCost(
									(cost) =>
										cost +
										response.data.data[i].items[0].price
											.regular
								);
								break;
							}
						}
					});
				setPrices(arr);
			});

			axios.get('http://localhost:8080/user/get/' + sessionStorage.getItem('id'))
				.then((response) => {
					response.data.order.push({
						recipe: selectedRecipe.title,
						store: selectedStore.name,
						cost: cost.toString(),
					});
					axios.put(
						'http://localhost:8080/user/update/order',
						response.data
					);
				});
		}
	}, [selectedStore]);

	const options = {
		closeBoxURL: '',
		enableEventPropagation: true,
		disableAutoPan: true,
	};

	if (!isLoaded) return <div className='body'></div>;

	return (
		<div className='body'>
			<div className='mid-body'>
				<Box sx={{ display: 'inline-flex' }}>
					<Box
						sx={{
							display: 'inline',
							border: 'solid',
							borderWidth: '1px',
							marginRight: '50px',
							height: '45rem',
							borderRadius: '20px',
							backgroundColor: bcolor,
						}}
					>
						<Box
							sx={{
								justifyContent: 'space-evenly',
								alignItems: 'center',
								display: 'block',
								textAlign: 'center',
								padding: '30px',
								borderRadius: '20px',
								borderBottom: 'none',
								borderWidth: '1px',
								backgroundColor: '#5f7470',
								borderBottomLeftRadius: '0px',
								borderBottomRightRadius: '0px',
							}}
							fontFamily={''}
						>
							Map
						</Box>
						<Box
							sx={{
								border: '1px',
								borderColor: 'black',
								margin: '3rem',
								marginTop: '3rem',
							}}
						>
							<GoogleMap
								onLoad={(map) => {
									setMap(map);
								}}
								zoom={11}
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
										>
											<InfoBox
												options={options}
												position={{
													lat: item.geolocation
														.latitude,
													lng: item.geolocation
														.longitude,
												}}
											>
												<div
													style={{
														padding: 12,
														background:
															'rgba(0, 0, 0, 0.7)',
													}}
												>
													<div
														style={{
															fontSize: 16,
															fontColor: `#08233B`,
														}}
													>
														{item.address
															.addressLine1 +
															', ' +
															item.address.city +
															', ' +
															item.address.state +
															' ' +
															item.address
																.zipCode}
													</div>
												</div>
											</InfoBox>
										</MarkerF>
									);
								})}
							</GoogleMap>
						</Box>
					</Box>
					<Box
						sx={{
							width: '40rem',
							justifyContent: 'center',
							alignItems: 'center',
							display: 'inline-block',
							backgroundColor: '#5f7470',
							height: '45rem',
							borderRadius: '20px',
							border: 'solid',
							borderWidth: '1px',
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
											placeholder: 'Enter Location',
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
									borderWidth: '1px',
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
								backgroundColor: '#2E3837',
								border: 'solid',
								borderWidth: '1px',
								borderBottom: 'none',
							}}
						>
							<Tabs
								value={tab}
								onChange={handleChange}
								textColor='white'
								TabIndicatorProps={{
									style: {
										backgroundColor: 'white',
									},
								}}
							>
								<Tab
									sx={{
										'&:hover': {
											backgroundColor: '#483C33',
										},
									}}
									icon={<MenuBookIcon />}
									label='Recipes'
								/>
								<Tab
									sx={{
										'&:hover': {
											backgroundColor: '#483C33',
										},
									}}
									icon={<LocalGroceryStoreIcon />}
									label='Stores'
								/>
								<Tab
									sx={{
										'&:hover': {
											backgroundColor: '#483C33',
										},
									}}
									icon={<ReceiptIcon />}
									label='Cost'
								/>
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
											<ListButton
												onClick={() => {
													setSelectedRecipe(item);
													setTab(1);
													console.log(selectedRecipe);
												}}
											>
												{item.title}
											</ListButton>
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
											<ListButton
												onClick={() => {
													setSelectedStore(item);
													setTab(2);
													console.log(selectedStore);
												}}
											>
												Kroger -{' '}
												{item.address.addressLine1 +
													', ' +
													item.address.city +
													', ' +
													item.address.state +
													' ' +
													item.address.zipCode}
											</ListButton>
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
								<Box>
									<StyledReceipt>
										<Typography
											fontWeight={'bold'}
											fontSize={'30px'}
										>
											Kroger
										</Typography>
										<Typography>
											{
												'* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *'
											}
										</Typography>
										<Typography>
											{'CASH RECEIPT'}
										</Typography>
										<Typography>
											{
												'* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *'
											}
										</Typography>
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												width: '20rem',
											}}
										>
											<Typography fontWeight={'bold'}>
												Description
											</Typography>
											<Typography fontWeight={'bold'}>
												{' '}
												Price
											</Typography>
										</Box>
										<Box
											sx={{
												width: '20rem',
											}}
										>
											{prices.map((item, index) => {
												if (
													index < ingredients.length
												) {
													return (
														<Box
															sx={{
																display: 'flex',
																flexDirection:
																	'row',
																justifyContent:
																	'space-evenly',
															}}
														>
															<Typography
																sx={{
																	display:
																		'block',
																	color: 'black',
																	flexGrow:
																		'1',
																}}
															>
																{
																	ingredients[
																		index
																	].nameClean
																}
															</Typography>
															<Typography
																sx={{
																	color: 'black',
																}}
															>
																{prices[index]}
															</Typography>
														</Box>
													);
												}
											})}
										</Box>
										<Typography>
											{
												'* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *'
											}
										</Typography>
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												width: '20rem',
											}}
										>
											<Typography
												fontSize={'18px'}
												fontWeight={'bold'}
											>
												Total
											</Typography>
											<Typography fontWeight={'bold'}>
												{cost.toFixed(2)}
											</Typography>
										</Box>
										<Typography>
											{
												'* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *'
											}
										</Typography>
										<Typography
											fontSize={'18px'}
											fontWeight={'bold'}
										>
											{' '}
											THANK YOU!
										</Typography>
									</StyledReceipt>
								</Box>
							}
						</TabPanel>
					</Box>
				</Box>
			</div>
		</div>
	);
}

export default Search;
