import { useMemo } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import '../Assets/Styles/Map.css'

function Home() {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	});

	if (!isLoaded) return <div>Load...</div>;

	return <Map/>
}

function Map(){
    const center = useMemo(() => ({ lat: 32.731, lng: -97.115 }), []);

    return (
		<GoogleMap
			zoom={10}
			center={center}
			mapContainerClassName='map-container'
		>
			<MarkerF position={center} />
		</GoogleMap>
	);
}

export default Home;
