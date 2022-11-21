import './Assets/Styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavigationBar from './Components/NavigationBar';

import Home from './Pages/Home';
import Feedback from './Pages/Feedback';
import Profile from './Pages/Profile';
import Search from './Pages/Search';

const root = ReactDOM.createRoot(document.getElementById('root'));

function foo(){
    console.log('function is being called')
}

setInterval(function(){
    foo()
}, 30000)

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
		</Routes>
	</Router>
);
