import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'hover.css/css/hover-min.css';
import 'react-awesome-button/dist/styles.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// -------------- Redux -----------------
import { Provider } from 'react-redux';
import store from './redux/store';
// --------------------------------------

//
// ─── IMPORTING COMPONENT ────────────────────────────────────────────────────────
//
import Landing from './components/LandingPage';
import Login from './components/Login';
class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route exact path="/login" component={Login} />
					</Switch>
				</Router>
			</Provider>
		);
	}
}

export default App;
