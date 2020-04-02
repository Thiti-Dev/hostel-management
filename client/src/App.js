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

const isStillAuthenticated = (token) => {
	//Check for token
	if (token) {
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

class App extends React.Component {
	componentWillMount() {
		// Big bug fixed ( changed from did mount to will mount => need to be checking before the route is created)
		// later will decide if this has to do everytimes that the component is rendered or just once in this cycle
		const token = cookie.load('token');
		isStillAuthenticated(token);
	}
	render() {
		//const state = store.getState();
		return (
			<Provider store={store}>
				<Router>
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route exact path="/login" component={Login} />
						<PrivateRoute exact path="/home" component={Home} />
						<PrivateRoute exact path="/profile/edit" component={EditProfile} />
						<PrivateRoute exact path="/create/hostel" component={CreateHostel} />
						<PrivateRoute exact path="/user/:username" component={Profile} />
						<PrivateRoute exact path="/hostel/:hostelSlug" component={Hostel} />
						<PrivateRoute exact path="/admin" component={AdminPanel} />
					</Switch>
				</Router>
			</Provider>
		);
	}
}

export default App;
