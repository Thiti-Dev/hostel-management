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
	background-image: url('https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg');
	height: 100%;
	width: 23%;
	border-radius: 1rem;
`;
const CustomInformationBox = styled.div`
	margin-left: 1rem;
	margin-top: 0.5rem;
`;

export default class BookHistory extends Component {
	render() {
		return (
			<React.Fragment>
				<Nav variant="tabs" defaultActiveKey="upcoming">
					<Nav.Item>
						<Nav.Link eventKey="upcoming">Up-coming</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="past">Past</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="all">All</Nav.Link>
					</Nav.Item>
				</Nav>
				<HistoryHolderContainer>
					<BookedHolder>
						<CustomPhotoInside />
						<CustomInformationBox>
							<GoLocation /> The Ayutthaya Hostel
							<ul>
								<li>
									<FaRegCalendarAlt /> 25 Apr 2020 - 29 Apr 2020
								</li>
								<li>
									<IoMdPeople /> 5 people
								</li>
								<li>
									<GiTakeMyMoney /> Spent 2500 baht
								</li>
							</ul>
						</CustomInformationBox>
					</BookedHolder>

					<BookedHolder>
						<CustomPhotoInside />
						<CustomInformationBox>
							<GoLocation /> The Ayutthaya Hostel
							<ul>
								<li>
									<FaRegCalendarAlt /> 25 Apr 2020 - 29 Apr 2020
								</li>
								<li>
									<IoMdPeople /> 5 people
								</li>
								<li>
									<GiTakeMyMoney /> Spent 2500 baht
								</li>
							</ul>
						</CustomInformationBox>
					</BookedHolder>
					<BookedHolder>
						<CustomPhotoInside />
						<CustomInformationBox>
							<GoLocation /> The Ayutthaya Hostel
							<ul>
								<li>
									<FaRegCalendarAlt /> 25 Apr 2020 - 29 Apr 2020
								</li>
								<li>
									<IoMdPeople /> 5 people
								</li>
								<li>
									<GiTakeMyMoney /> Spent 2500 baht
								</li>
							</ul>
						</CustomInformationBox>
					</BookedHolder>
					<BookedHolder>
						<CustomPhotoInside />
						<CustomInformationBox>
							<GoLocation /> The Ayutthaya Hostel
							<ul>
								<li>
									<FaRegCalendarAlt /> 25 Apr 2020 - 29 Apr 2020
								</li>
								<li>
									<IoMdPeople /> 5 people
								</li>
								<li>
									<GiTakeMyMoney /> Spent 2500 baht
								</li>
							</ul>
						</CustomInformationBox>
					</BookedHolder>
					<BookedHolder>
						<CustomPhotoInside />
						<CustomInformationBox>
							<GoLocation /> The Ayutthaya Hostel
							<ul>
								<li>
									<FaRegCalendarAlt /> 25 Apr 2020 - 29 Apr 2020
								</li>
								<li>
									<IoMdPeople /> 5 people
								</li>
								<li>
									<GiTakeMyMoney /> Spent 2500 baht
								</li>
							</ul>
						</CustomInformationBox>
					</BookedHolder>
					<BookedHolder>
						<CustomPhotoInside />
						<CustomInformationBox>
							<GoLocation /> The Ayutthaya Hostel
							<ul>
								<li>
									<FaRegCalendarAlt /> 25 Apr 2020 - 29 Apr 2020
								</li>
								<li>
									<IoMdPeople /> 5 people
								</li>
								<li>
									<GiTakeMyMoney /> Spent 2500 baht
								</li>
							</ul>
						</CustomInformationBox>
					</BookedHolder>
					<BookedHolder>
						<CustomPhotoInside />
						<CustomInformationBox>
							<GoLocation /> The Ayutthaya Hostel
							<ul>
								<li>
									<FaRegCalendarAlt /> 25 Apr 2020 - 29 Apr 2020
								</li>
								<li>
									<IoMdPeople /> 5 people
								</li>
								<li>
									<GiTakeMyMoney /> Spent 2500 baht
								</li>
							</ul>
						</CustomInformationBox>
					</BookedHolder>
				</HistoryHolderContainer>
			</React.Fragment>
		);
	}
}
