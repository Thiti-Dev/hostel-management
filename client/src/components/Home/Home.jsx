import React from 'react';
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
	InputGroup
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

import { FaSearchLocation, FaRegCalendarAlt } from 'react-icons/fa';
import { IoMdPeople, IoIosInformationCircleOutline, IoIosPeople } from 'react-icons/io';
import { FiMapPin } from 'react-icons/fi';
import { TiContacts } from 'react-icons/ti';
import { AiOutlineMail } from 'react-icons/ai';
import { GiMoneyStack, GiTakeMyMoney } from 'react-icons/gi';
//
// ─── MY OWN LIB ─────────────────────────────────────────────────────────────────
//
import OnScreenSensor from 'react-onscreensensor';
// ────────────────────────────────────────────────────────────────────────────────

import SectionSeparator from '../common/SectionSeparator';

import Rating from 'react-rating';
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

const PlaceOuterContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center; /* For horizontal alignment */
	align-items: center; /* For vertical alignment */
	@media (max-width: 1200px) {
		display: block; /* If less than that just set to block ( no responsive design for now) */
	}
`;

const PlaceContainer = styled(Card)`
	position: relative;
	margin-top: 2rem;
	margin-bottom: 2rem;
	height: 15rem;
	width: 70rem; /* old 100% */
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	overflow: hidden;
	display: block;
`;

const PlacePhoto = styled.div`
	width: 30%;
	height: 100%;
	background-image: url('https://img.budgettravel.com/_contentHero1x/japanese-temple-at-sunset_reduced.jpg?mtime=20191122141348');
	background-size: cover;
	background-repeat: round;
	float: left;
	display: inline;
`;

const PlaceInfo = styled.div`
	height: 100%;
	width: 45%;
	display: inline-block;
	padding: 1.0rem 1rem 0.5rem;
	font-family: 'Courier New', Courier, monospace;
	border-right: 2px solid whitesmoke;
`;

const PlaceInfo2 = styled.div`
	position: absolute;
	width: 25%;
	height: 100%;
	padding: 1.0rem 1rem 0.5rem;
	display: inline-block;
	font-family: 'Courier New', Courier, monospace;
`;

const PlaceName = styled.p`
	font-size: 1.5rem;
	font-weight: bold;
	line-height: 30px; /* within paragraph */
	margin-bottom: 0px; /* between paragraphs */
`;

const StatusHolder = styled.p`
	font-size: 1rem;
	line-height: 50px; /* within paragraph */
	margin-bottom: 0px; /* between paragraphs */
`;
const InformationHolder = styled.p`
	font-size: 1rem;
	line-height: 25px; /* within paragraph */
	margin-bottom: 10px; /* between paragraphs */
`;

const VerifiedBadge = styled(Badge)`
	font-size: 0.8rem;
`;

const FetchedInformation = styled.h1`
	font-family: 'Courier New', Courier, monospace;
	margin-top: 3rem;
`;

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		const today = new Date();
		const tomorrow = new Date(today);
		tomorrow.setDate(tomorrow.getDate() + 1);
		this.state = {
			startDate: new Date(Date.now()),
			endDate: tomorrow,
			totalGuest: 1
		};
	}
	render() {
		let { startDate, endDate, totalGuest } = this.state;
		return (
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
											onChange={(date) => this.setState({ startDate: date })}
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
											onChange={(date) => this.setState({ endDate: date })}
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
									}, 500)}
								loadingLabel="Finding places for you , Please be patient . . ."
								resultLabel="👍🏽"
							>
								Find place
							</AwesomeButtonProgress>
						</Form>
					</SearchContainer>
				</Parallax>
				<Container>
					<FetchedInformation>Found 1 Total place</FetchedInformation>
					<PlaceOuterContainer>
						<PlaceContainer>
							<PlacePhoto />
							<PlaceInfo>
								<PlaceName>The Ayutthaya Hostel</PlaceName>
								<StatusHolder>
									status: <VerifiedBadge variant="success">verified</VerifiedBadge>
								</StatusHolder>
								<InformationHolder>
									<FiMapPin /> Ayutthaya , Thailand 14120
								</InformationHolder>
								<InformationHolder>
									<IoIosInformationCircleOutline /> ห้องพักขนาดใหญ่ มี 10 เตียง , มีสระว่ายน้ำ ,
									สวนหลังบ้าน มีฟิตเนสในตัว
								</InformationHolder>
								<InformationHolder>
									<TiContacts /> 093-139-8015 , <AiOutlineMail /> adm@admin.in.th
								</InformationHolder>
							</PlaceInfo>
							<PlaceInfo2>
								<InformationHolder>
									<IoIosPeople /> : 7 people booked <br />
									<GiMoneyStack /> : 400 baht / night <br />
									<GiTakeMyMoney /> : Total 5000 baht
								</InformationHolder>
								<AwesomeButtonProgress
									style={{ width: '100%', marginTop: '0rem' }}
									type="secondary"
									size="medium"
									action={(element, next) =>
										setTimeout(() => {
											//awesome_button_middleware = next;
											next();
										}, 500)}
									loadingLabel="Getting more information . . ."
									resultLabel="👍🏽"
								>
									View more
								</AwesomeButtonProgress>
								<AwesomeButtonProgress
									style={{ width: '100%', marginTop: '0.5rem' }}
									type="primary"
									size="medium"
									action={(element, next) =>
										setTimeout(() => {
											//awesome_button_middleware = next;
											next();
										}, 500)}
									loadingLabel="Booking the place . . ."
									resultLabel="👍🏽"
								>
									Book now
								</AwesomeButtonProgress>
							</PlaceInfo2>
						</PlaceContainer>
					</PlaceOuterContainer>
				</Container>
			</Container>
		);
	}
}
