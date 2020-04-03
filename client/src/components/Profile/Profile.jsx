import React, { Component } from 'react';
import axios from 'axios';
import { Fab, Action } from 'react-tiny-fab';
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
import DatePicker from 'react-date-picker';
import { AwesomeButton, AwesomeButtonProgress, AwesomeButtonSocial } from 'react-awesome-button';
//
// ─── STYLING ────────────────────────────────────────────────────────────────────
//
import { Animated } from 'react-animated-css';
import styled from 'styled-components';
import { fade_move_down } from '../../styles/Keyframe';
// ────────────────────────────────────────────────────────────────────────────────
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import BookHistory from './BookHistory';
import Published from './Published';
import { FiMapPin, FiNavigation2 } from 'react-icons/fi';
import { TiHomeOutline } from 'react-icons/ti';
import queryString from 'query-string';

const MySwal = withReactContent(Swal);

const UserNavColumn = styled(Col)`
    height: 100vh;
    width: 100%;
    background-color:#DADCDE;
    padding:2.5rem;
    font-family: 'Courier New', Courier, monospace;
`;

const UserNavColumn2 = styled.div`
	height: 100vh;
	width: 24.5rem;
	background-color: #dadcde;
	padding: 2.5rem;
	font-family: 'Courier New', Courier, monospace;
	float: left;
	display: block;
`;

const CustomNameLabel = styled.p`
	font-size: 1.8rem;
	font-weight: bolder;
	/* white-space: nowrap; */
	margin-top: 2rem;
`;

const CustomUserNameLabel = styled.p`
	font-size: 1.8rem;
	font-weight: 100;
	/* white-space: nowrap; */
`;

const CustomNavList = styled.li`
	padding: 0.8rem;
	padding-left: 1.3rem;
	background-color: ${(props) => (props.active ? '#c9c1bf' : 'none')};
	cursor: pointer;
`;

const CustomUlHolder = styled.ul`
	list-style-type: none;
	background-color: #f8f8f8;

	border-radius: 4px;
	border: 1px solid #e7e7e7;
	padding-inline-start: 0.0rem; /* No additional in-line start */
`;

const OutestContainer = styled(Container)`
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
`;

const ContentContainer = styled(Container)`
    margin-left: 24.5rem;
	padding:5rem;
    height: 100vh;
    width: 71.48rem;                                            
`;

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true, //  still loading by default
			profileData: null,
			bookingHistory: null,
			publishedHistory: null,
			currentAction: 'history'
		};
	}

	async getUserProfileDetails(username) {
		try {
			const profile_request = await axios.get(`/api/users/${username}`);
			const profileData = profile_request.data.data;
			this.setState({ profileData });
			document.title = profileData.username + "'s profile";
		} catch (error) {
			console.log(error.response);
			this.props.history.push('/404');
		}
	}

	async getUserBookingHistory(username) {
		try {
			const profile_request = await axios.get(`/api/users/${username}/booking`);
			const bookingHistory = profile_request.data.data;
			this.setState({ bookingHistory });
		} catch (error) {
			console.log(error.response);
		}
	}

	async getUserPublishedHostel(username) {
		try {
			const profile_request = await axios.get(`/api/users/${username}/hostel`);
			const publishedHistory = profile_request.data.data;
			//console.log(publishedHistory);
			this.setState({ publishedHistory });
		} catch (error) {
			console.log(error.response);
		}
	}

	componentDidMount() {
		// Consequence in order
		// @! Don't want it to fetch when just clicked to switch from booking => published ( prevention of spamming request sent)
		this.getUserProfileDetails(this.props.match.params.username);
		this.getUserBookingHistory(this.props.match.params.username);
		this.getUserPublishedHostel(this.props.match.params.username);
		// ------
		const values = queryString.parse(this.props.location.search);
		if (values.action) {
			// recieved the action from given query
			if (values.action === 'published') {
				this.setState({ currentAction: 'published' });
				// Silent the url-action (query)
				window.history.pushState(null, '', `/user/${this.props.match.params.username}`);
			}
		}
	}

	onNavClicked(action) {
		if (action === 'history') {
			// User trying to view the booking history of the current user
			this.setState({ currentAction: 'history' });
		} else {
			// If user is viewing the published of that user
			this.setState({ currentAction: 'published' });
		}
	}

	render() {
		const { profileData, bookingHistory, currentAction, publishedHistory } = this.state;
		let rendered_profile;

		if (!profileData) {
			rendered_profile = (
				<React.Fragment>
					<Row style={{ textAlign: 'center' }}>
						<Col md={12}>
							<Spinner style={{ textAlign: 'center' }} animation="border" variant="secondary" />
						</Col>
					</Row>
				</React.Fragment>
			);
		} else {
			rendered_profile = (
				<React.Fragment>
					<Row style={{ textAlign: 'center' }}>
						<Col md={12}>
							<Image
								src={`https://storage.googleapis.com/hosteloga-uploads/${profileData.photo}`}
								rounded
								width="280"
								height="220"
							/>
						</Col>
					</Row>
					<Row style={{ textAlign: 'center' }}>
						<Col md={12}>
							<CustomNameLabel>
								{profileData.firstName} {profileData.lastName}
							</CustomNameLabel>
							<CustomUserNameLabel>@{profileData.username}</CustomUserNameLabel>
						</Col>
					</Row>
					<Row style={{ textAlign: 'center' }}>
						<Col md={12}>
							<CustomUlHolder>
								<CustomNavList
									active={currentAction === 'history' ? true : false}
									onClick={() => this.onNavClicked('history')}
								>
									Booking History
								</CustomNavList>
								<CustomNavList
									active={currentAction === 'published' ? true : false}
									onClick={() => this.onNavClicked('published')}
								>
									Published Hostel
								</CustomNavList>
							</CustomUlHolder>
						</Col>
					</Row>
				</React.Fragment>
			);
		}

		let rendered_action;
		if (currentAction === 'history') {
			rendered_action = <BookHistory booking_history={bookingHistory} />;
		} else {
			rendered_action = <Published published_history={publishedHistory} />;
		}
		return (
			<React.Fragment>
				<Fab
					icon={<FiNavigation2 />}
					mainButtonStyles={{ backgroundColor: '#ff0000' }}
					position={{ top: 24, right: 24 }}
				>
					<Action
						text="Back to home"
						onClick={() => this.props.history.push('/home')}
						style={{ backgroundColor: '#ed0c5e' }}
					>
						<TiHomeOutline />
					</Action>
				</Fab>

				<OutestContainer fluid>
					<UserNavColumn2>{rendered_profile}</UserNavColumn2>
					<ContentContainer fluid>{rendered_action}</ContentContainer>
				</OutestContainer>
			</React.Fragment>
		);
	}
}
