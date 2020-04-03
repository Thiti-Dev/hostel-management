import React, { Component } from 'react';
import SiteNav, { ContentGroup } from 'react-site-nav';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
	//Button,
	//Jumbotron,
	Container,
	Spinner,
	Breadcrumb,
	Toast,
	Row,
	Col,
	Card,
	Image,
	Badge,
	Button,
	Form,
	InputGroup,
	Navbar
} from 'react-bootstrap';
import Hostels from './Hostels';
import Account from './Account';
import Admin from './Admin';
import Booking from './Booking';

class NavBar extends Component {
	constructor(props) {
		super(props);
	}
	goToRoute(route) {
		this.props.history.push(route);
	}
	render() {
		const { user } = this.props.auth;
		console.log('CURRENT ROLE == ' + user.role);
		return (
			<React.Fragment>
				<div style={{ position: 'absolute', zIndex: '9999' }}>
					<SiteNav background="transparent" fontSize="18" fontFamily="Courier New" fontSize="18" align="left">
						<ContentGroup title="Account" width="260" height="200">
							<Account gotoroute={this.goToRoute.bind(this)} />
						</ContentGroup>
						<ContentGroup title="Partner" width="420" height="270">
							<Hostels />
						</ContentGroup>
						<ContentGroup title="My Booking" width="500" height="500">
							<Booking />
						</ContentGroup>
						{user.role === 'admin' ? (
							<ContentGroup title="Admin panel" width="420" height="100">
								<Admin />
							</ContentGroup>
						) : (
							<React.Fragment />
						)}
					</SiteNav>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth
});
export default connect(mapStateToProps)(withRouter(NavBar));
