import './Assets/Styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import NavigationBar from './Components/NavigationBar';

import Home from './Pages/Home';
import Login from './Pages/Login';



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<Router>
		<NavigationBar />
		<Routes>
			<Route
				path='/'
				element={<Home />}
			/>
			<Route
				path='/login'
				element={<Login />}
			/>
		</Routes>
	</Router>
);
