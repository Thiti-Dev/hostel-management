import React, { Component } from 'react';
import axios from 'axios';
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
	Navbar,
	Nav
} from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import { AwesomeButton, AwesomeButtonProgress, AwesomeButtonSocial } from 'react-awesome-button';
import Moment from 'react-moment';
//
// ─── STYLING ────────────────────────────────────────────────────────────────────
//
import { Animated } from 'react-animated-css';
import styled from 'styled-components';
import { fade_move_down } from '../../styles/Keyframe';
// ────────────────────────────────────────────────────────────────────────────────
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { FaSearchLocation, FaRegCalendarAlt } from 'react-icons/fa';
import { IoMdPeople, IoIosInformationCircleOutline, IoIosPeople, IoIosCloudyNight } from 'react-icons/io';
import { FiMapPin } from 'react-icons/fi';
import { GiMoneyStack, GiTakeMyMoney } from 'react-icons/gi';
import { MdMoveToInbox } from 'react-icons/md';
import { FiBox } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';

import * as Func from '../../utils/Functions';

const MySwal = withReactContent(Swal);

const HistoryHolderContainer = styled.div`
	margin-top: 2rem;
	font-family: 'Courier New', Courier, monospace;
	height: 75vh;
	overflow-y: auto;

	&::-webkit-scrollbar {
		width: 0.3vw;
		padding-left: 5vw;
	}
	&::-webkit-scrollbar-track {
		background: #f1f1f100;
		border-radius: 10px;
	}

	/* Handle */
	&::-webkit-scrollbar-thumb {
		background: grey;
		border-radius: 10px;
	}

	/* Handle on hover */
	&::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
`;
const BookedHolder = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	height: 8rem;
	margin-bottom: 2rem;
	&:hover {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	}
`;
const CustomPhotoInside = styled.div`
	background-size: cover;
	background-position: center;
background-image: url('${(props) => props.photo_url}');
	height: 100%;
	width: 23%;
	border-radius: 1rem;
`;
const CustomInformationBox = styled.div`
	margin-left: 1rem;
	margin-top: 0.5rem;
`;

const isToday = (someDate) => {
	const today = new Date();
	return (
		someDate.getDate() == today.getDate() &&
		someDate.getMonth() == today.getMonth() &&
		someDate.getFullYear() == today.getFullYear()
	);
};

export default class BookHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filterType: 1,
			renderedHistory: null,
			pureHistory: null
		};
		this.filterTheHistory = this.filterTheHistory.bind(this);
	}

	componentDidMount() {
		// Re-filtering when user just switched from another nav (action)
		this.filterTheHistory(1);
	}

	componentWillReceiveProps(nextProps) {
		const { filterType } = this.state;
		// Called twice => once when the null is initialized in => after that whenever the props is update by its parent this will be called again
		if (nextProps.booking_history) {
			//filted to called once => when the booking_history is successfully fetched
			this.setState({ pureHistory: nextProps.booking_history }, () => {
				this.filterTheHistory(1);
			});
		}
		//this.filterTheHistory(filterType); // filter everytime that component got update
	}

	filterTheHistory(type) {
		// @TYPE
		// 1 == filter by upcoming => checkIn >= Date.now()
		// 2 == filter by past => checkIn < Date.now()
		// 3 == see all => no filter needed
		this.setState({ filterType: type });
		if (this.props.booking_history) {
			// If recieved the booking history
			let result;
			switch (type) {
				case 1:
					result = this.props.booking_history.filter((booking) => {
						return new Date(booking.checkIn) >= new Date();
					});
					this.setState({ renderedHistory: result });
					break;
				case 2:
					result = this.props.booking_history.filter((booking) => new Date(booking.checkOut) < new Date());
					this.setState({ renderedHistory: result });
					break;
				case 3:
					result = this.props.booking_history;
					this.setState({ renderedHistory: result });
					break;
				case 4:
					result = this.props.booking_history.filter((booking) => {
						return (
							(new Date(booking.checkIn) <= new Date() || isToday(new Date(booking.checkIn))) &&
							new Date(booking.checkOut) > new Date()
						);
					});
					this.setState({ renderedHistory: result });
					break;
				default:
					break;
			}
		}
	}
	render() {
		const { renderedHistory, pureHistory } = this.state;
		let rendered_history;
		if (!renderedHistory) {
			rendered_history = <Spinner style={{ textAlign: 'center' }} animation="border" variant="secondary" />;
		} else {
			rendered_history = renderedHistory.map((booking, key) => {
				return (
					<React.Fragment key={key}>
						<BookedHolder>
							<CustomPhotoInside
								photo_url={`https://storage.googleapis.com/hosteloga-uploads/${booking.hostel.photo}`}
							/>
							<CustomInformationBox>
								<GoLocation /> {booking.hostel.name}
								<ul>
									<li>
										<FaRegCalendarAlt />{' '}
										<Moment format="D MMM YYYY" withTitle>
											{booking.checkIn}
										</Moment>{' '}
										-{' '}
										<Moment format="D MMM YYYY" withTitle>
											{booking.checkOut}
										</Moment>{' '}
										, <IoIosCloudyNight />
										{'  '}
										{Func.getTotalDayBetweenDate(
											new Date(booking.checkIn),
											new Date(booking.checkOut)
										)}{' '}
										night
									</li>
									<li>
										<IoMdPeople /> {booking.totalGuest} people
									</li>
									<li>
										<GiTakeMyMoney /> Spent {booking.totalPrice} baht
									</li>
								</ul>
							</CustomInformationBox>
						</BookedHolder>
					</React.Fragment>
				);
			});
		}
		return (
			<React.Fragment>
				<Nav variant="tabs" defaultActiveKey="upcoming">
					<Nav.Item>
						<Nav.Link eventKey="upcoming" onClick={() => this.filterTheHistory(1)}>
							Up-coming (Future)
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="special" onClick={() => this.filterTheHistory(4)}>
							Currently (Now)
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="past" onClick={() => this.filterTheHistory(2)}>
							Past
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="all" onClick={() => this.filterTheHistory(3)}>
							All
						</Nav.Link>
					</Nav.Item>
				</Nav>
				<HistoryHolderContainer>
					{rendered_history.length > 0 ? rendered_history : <p>No activity for a moment</p>}
				</HistoryHolderContainer>
			</React.Fragment>
		);
	}
}
