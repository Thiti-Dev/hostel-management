import React, { Component } from 'react';
import SiteNav, { ContentGroup } from 'react-site-nav';
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

export class NavBar extends Component {
	constructor(props) {
		super(props);
	}
	goToRoute() {
		this.props.history.push('/profile/edit');
	}
	render() {
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
						<ContentGroup title="Admin panel" width="420" height="100">
							<Admin />
						</ContentGroup>
					</SiteNav>
				</div>
			</React.Fragment>
		);
	}
}

export default withRouter(NavBar);
