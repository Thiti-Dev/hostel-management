import React from 'react';

import cookie from 'react-cookies';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'hover.css/css/hover-min.css';
import 'react-awesome-button/dist/styles.css';
import 'react-tiny-fab/dist/styles.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// -------------- Redux -----------------
import { Provider } from 'react-redux';
import store from './redux/store';

import { setCurrentUser } from './redux/actions/authActions';
// --------------------------------------

//
// ─── IMPORTING COMPONENT ────────────────────────────────────────────────────────
//
import Landing from './components/LandingPage';
import Login from './components/Login';
import Home from './components/Home';

import PrivateRoute from './components/common/PrivateRoute';

import DecodedJWT from './utils/DecodedJWT';
import EditProfile from './components/EditProfile';
import CreateHostel from './components/CreateHostel';
import Profile from './components/Profile';
import Hostel from './components/Hostel';
import AdminPanel from './components/AdminPanel';
import PageNotFound from './components/PageNotFound';
import UnAuthorized from './components/UnAuthorized';
import setAuthToken from './utils/setAuthToken';
let axiosDefaults = require('axios/lib/defaults');
axiosDefaults.baseURL = 'https://hosteloga-api.herokuapp.com';

const isStillAuthenticated = (token) => {
	//Check for token
	if (token) {
		setAuthToken(token);
		//Decode token and get user info and exp
		const decoded = DecodedJWT(token);
		// Set user and isAuthenticated
		store.dispatch(setCurrentUser(decoded));

		// Check for expired token
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			//Logout User
			//store.dispatch(logoutUser());
			store.dispatch(setCurrentUser({})); // set to an empty object => isAuthenticated will be false
			//Redirect to login
			window.location.href = '/login';
		}
	}
};

isStillAuthenticated(localStorage.jwtToken);

class App extends React.Component {
	componentWillMount() {}
	render() {
		//const state = store.getState();
		return (
			<Provider store={store}>
				<Router>
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/401" component={UnAuthorized} />
						<Route exact path="/404" component={PageNotFound} />
						<PrivateRoute exact path="/home" component={Home} />
						<PrivateRoute exact path="/profile/edit" component={EditProfile} />
						<PrivateRoute exact path="/create/hostel" component={CreateHostel} />
						<PrivateRoute exact path="/user/:username" component={Profile} />
						<PrivateRoute exact path="/hostel/:hostelSlug" component={Hostel} />
						<PrivateRoute exact path="/admin" component={AdminPanel} />
						<Route exact path="*" component={PageNotFound} />
					</Switch>
				</Router>
			</Provider>
		);
	}
}

export default App;
