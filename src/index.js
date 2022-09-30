import './Assets/Styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavigationBar from './Components/NavigationBar';

import Home from './Pages/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<Router>
		<NavigationBar />
		<Routes>
			<Route
				path='/'
				element={<Home />}
			/>
		</Routes>
	</Router>
);
