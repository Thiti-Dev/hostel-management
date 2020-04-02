import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setCurrentSearchData } from '../../redux/actions/mainActions';
import { withRouter } from 'react-router-dom';
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
import { AwesomeButton, AwesomeButtonProgress, AwesomeButtonSocial } from 'react-awesome-button';
//
// ─── STYLING ────────────────────────────────────────────────────────────────────
//
import { Animated } from 'react-animated-css';
import styled from 'styled-components';

import { fade_move_down } from '../../styles/Keyframe';
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── USEFUL LIB ─────────────────────────────────────────────────────────────────
//
import * as Scroll from 'react-scroll';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

import { Parallax, Background } from 'react-parallax';
import DatePicker from 'react-date-picker';
// ────────────────────────────────────────────────────────────────────────────────

import { FaSearchLocation, FaRegCalendarAlt, FaHistory } from 'react-icons/fa';
import { IoMdPeople, IoIosInformationCircleOutline, IoIosPeople } from 'react-icons/io';
import { FiMapPin, FiNavigation2 } from 'react-icons/fi';
import { TiContacts } from 'react-icons/ti';
import { AiOutlineMail } from 'react-icons/ai';
import { GiMoneyStack, GiTakeMyMoney } from 'react-icons/gi';
import { MdPersonOutline } from 'react-icons/md';
//
// ─── MY OWN LIB ─────────────────────────────────────────────────────────────────
//
import OnScreenSensor from 'react-onscreensensor';
// ────────────────────────────────────────────────────────────────────────────────

import SectionSeparator from '../common/SectionSeparator';

import PlaceLists from './PlaceLists';

import Rating from 'react-rating';
import NavBar from '../common/NavBar/NavBar';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const mainParallax =
	'https://images.unsplash.com/photo-1527796261673-e9d61cc1e03c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80';

const SearchContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: white;
	opacity: 0.8;
	z-index: 999;
	width: 50rem;
	padding: 2rem;
	/* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
	box-shadow: 5px 5px grey;
	border-radius: 1.5rem;
`;

const CustomLocationSearchInput = styled(Form.Control)`
	height: 3.5rem;
	text-align: center;
	&:focus{
		outline: none;
		border-color: inherit;
		box-shadow: none;
	}
`;
class Home extends React.Component {
	constructor(props) {
		super(props);
		const today = new Date();
		const tomorrow = new Date(today);
		tomorrow.setDate(tomorrow.getDate() + 1);
		this.state = {
			startDate: new Date(Date.now()),
			endDate: tomorrow,
			totalGuest: 1,
			placesData: [],
			searchStr: ''
		};
		this.onSetStartDate = this.onSetStartDate.bind(this);
		this.onSetEndDate = this.onSetEndDate.bind(this);
	}

	componentDidMount() {
		document.title = 'Find place';
	}

	async findPlace() {
		const { searchStr } = this.state;
		try {
			let rendered_url = searchStr.length <= 0 ? '/api/hostels' : `/api/hostels?search=${searchStr}`;
			const fetched_hostel = await axios.get(rendered_url);
			this.setState({ placesData: fetched_hostel.data.data });
			this.props.setCurrentSearchData({
				startDate: this.state.startDate,
				endDate: this.state.endDate,
				totalGuest: this.state.totalGuest
			});
			if (fetched_hostel.data.data.length <= 0) {
				// not fonud any
				MySwal.fire({
					position: 'center',
					icon: 'error',
					title: `No hostel matched with ${searchStr}`,
					showConfirmButton: false,
					timer: 1500,
					timerProgressBar: true,
					backdrop: false
				});
			}
		} catch (err) {}
	}

	goToMyProfile() {
		this.props.history.push(`/user/${this.props.auth.user.username}`);
	}

	onSetStartDate(date) {
		const { endDate } = this.state;
		if (date >= endDate) {
			const tomorrowOfNewDate = new Date(date);
			tomorrowOfNewDate.setDate(tomorrowOfNewDate.getDate() + 1);
			this.setState({ startDate: date, endDate: tomorrowOfNewDate });
		} else {
			this.setState({ startDate: date });
		}
	}

	onSetEndDate(date) {
		const { startDate } = this.state;
		if (date <= startDate) {
			const yesterdayOfNewDate = new Date(date);
			yesterdayOfNewDate.setDate(yesterdayOfNewDate.getDate() - 1);
			this.setState({ startDate: yesterdayOfNewDate, endDate: date });
		} else {
			this.setState({ endDate: date });
		}
	}

	render() {
		let { startDate, endDate, totalGuest, searchStr } = this.state;
		return (
			<React.Fragment>
				<NavBar />

				<Fab icon={<FiNavigation2 />} mainButtonStyles={{ backgroundColor: '#ff0000' }}>
					<Action
						style={{
							backgroundColor: '#89db42',
							backgroundImage: `url('/uploads/${this.props.auth.user.photo}')`,
							backgroundPosition: 'center',
							backgroundSize: 'contain'
						}}
						text="My profile"
						onClick={() => this.goToMyProfile()}
					/>
				</Fab>

				<Container fluid style={{ margin: 0, padding: 0 }}>
					<Parallax bgImage={mainParallax} strength={400} blur={{ min: -10, max: 15 }}>
						<div style={{ height: '100vh' }} />
						<SearchContainer>
							<Form noValidate onSubmit={(e) => e.preventDefault()}>
								<Form.Row>
									<Form.Group as={Col} md="12" controlId="validationCustomSearch">
										<InputGroup style={{ height: '3.5rem' }}>
											<InputGroup.Prepend>
												<InputGroup.Text id="inputGroupPrepend">
													<FaSearchLocation style={{ width: '2rem' }} />
												</InputGroup.Text>
											</InputGroup.Prepend>
											<CustomLocationSearchInput
												type="text"
												placeholder="Where do you want to have a rest in"
												aria-describedby="inputGroupPrepend"
												required
												autoComplete="off"
												value={searchStr}
												onChange={(e) => this.setState({ searchStr: e.target.value })}
											/>
										</InputGroup>
									</Form.Group>
								</Form.Row>
								<Form.Row>
									<Form.Group as={Col} md="4" controlId="validationCustomCheckIn">
										<Form.Label>Check In</Form.Label>
										<InputGroup style={{ height: '3.5rem' }}>
											<InputGroup.Prepend>
												<InputGroup.Text id="inputGroupPrepend">
													<FaRegCalendarAlt style={{ width: '2rem' }} />
												</InputGroup.Text>
											</InputGroup.Prepend>
											<DatePicker
												style={{ marginLeft: 5 }}
												value={startDate}
												onChange={this.onSetStartDate}
											/>
										</InputGroup>
									</Form.Group>
									<Form.Group as={Col} md="4" controlId="validationCustomCheckout">
										<Form.Label>Check Out</Form.Label>
										<InputGroup style={{ height: '3.5rem' }}>
											<InputGroup.Prepend>
												<InputGroup.Text id="inputGroupPrepend">
													<FaRegCalendarAlt style={{ width: '2rem' }} />
												</InputGroup.Text>
											</InputGroup.Prepend>
											<DatePicker
												style={{ marginLeft: 5, zIndex: '999' }}
												value={endDate}
												onChange={this.onSetEndDate}
											/>
										</InputGroup>
									</Form.Group>
									<Form.Group as={Col} md="4" controlId="validationCustomCheckout">
										<Form.Label>Guests</Form.Label>
										<InputGroup style={{ height: '3.5rem' }}>
											<InputGroup.Prepend>
												<InputGroup.Text id="inputGroupPrepend">
													<IoMdPeople style={{ width: '2rem' }} />
												</InputGroup.Text>
											</InputGroup.Prepend>
											<Form.Control
												as="select"
												size="lg"
												custom
												style={{ height: ' 3.5rem' }}
												onChange={(e) => this.setState({ totalGuest: e.target.value })}
												value={totalGuest}
											>
												<option value={1}>1 Guest</option>
												<option value={2}>2 Guests</option>
												<option value={3}>3 Guests</option>
												<option value={4}>4 Guests</option>
												<option value={5}>5 Guests</option>
												<option value={6}>6 Guests</option>
												<option value={7}>7 Guests</option>
												<option value={8}>8 Guests</option>
												<option value={9}>9 Guests</option>
											</Form.Control>
										</InputGroup>
									</Form.Group>
								</Form.Row>
								<AwesomeButtonProgress
									style={{ width: '100%', marginTop: '1rem', zIndex: '1' }}
									type="secondary"
									size="medium"
									action={(element, next) =>
										setTimeout(() => {
											//awesome_button_middleware = next;
											next();
											this.findPlace();
										}, 500)}
									loadingLabel="Finding places for you , Please be patient . . ."
									resultLabel="👍🏽"
								>
									{searchStr.length === 0 ? 'See all hostel' : 'Find hostel'}
								</AwesomeButtonProgress>
							</Form>
						</SearchContainer>
					</Parallax>
					<Container>
						<PlaceLists
							history={this.props.history}
							placeData={this.state.placesData}
							totalGuest={this.state.totalGuest}
						/>
					</Container>
				</Container>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	action: state.action,
	auth: state.auth
});
export default connect(mapStateToProps, { setCurrentSearchData })(Home);
