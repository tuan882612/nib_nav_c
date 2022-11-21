import './Assets/Styles/index.css';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavigationBar from './Components/NavigationBar';

import checkSession from './utils/UserUtilities';
import Home from './Pages/Home';
import Feedback from './Pages/Feedback';
import Profile from './Pages/Profile';
import Search from './Pages/Search';

const root = ReactDOM.createRoot(document.getElementById('root'));

sessionStorage.setItem("login", false)
sessionStorage.setItem("id", "")

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
			<Route path='/feedback'
				element={<Feedback />}
			/>
			<Route
				path='/profile'
				element={<Profile />}
			/>
		</Routes>
	</Router>
);
