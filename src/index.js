import './Assets/Styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavigationBar from './Components/NavigationBar';

import PreLogin from './Pages/PreLogin';
import PostLogin from './Pages/PostLogin'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<Router>
		<NavigationBar />
		<Routes>
			<Route
				path='/'
				element={<PreLogin />}
			/>
		</Routes>
	</Router>
);
