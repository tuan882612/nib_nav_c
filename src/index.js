import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Assets/Styles/index.css';

import NavigationBar from './Components/NavBar';

import Feedback from './Pages/Feedback';
import Home from './Pages/Home';
import LoginPage from './Pages/Login';
import Profile from './Pages/Profile';
import Search from './Pages/Search';
import CheckSession from './utils/UserUtilities';

const root = ReactDOM.createRoot(document.getElementById('root'));
CheckSession()

root.render(
	<Router>
		<NavigationBar />
		<Routes>
			<Route
				path='/'
				element={<Home />}
			/>
			<Route
				path='/search'
				element={<Search />}
			/>
			<Route
				path='/feedback'
				element={<Feedback />}
			/>
			<Route
				path='/profile'
				element={<Profile />}
			/>
			<Route
				path='/login'
				element={<LoginPage />}
			/>
		</Routes>
	</Router>
);