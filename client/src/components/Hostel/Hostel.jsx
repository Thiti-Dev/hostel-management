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
import { MdMoveToInbox, MdUpdate } from 'react-icons/md';
import { FiBox, FiPhone } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';
import { AiOutlineMail } from 'react-icons/ai';
import queryString from 'query-string';
import Comment from './Comment';

const MySwal = withReactContent(Swal);

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

export default class Hostel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentAction: 'details'
		};
	}
	onChangeAction(action) {
		console.log('Changing action to : ' + action);
		this.setState({ currentAction: action });
	}
	render() {
		const { currentAction } = this.state;
		let rendered_content;
		if (currentAction === 'details') {
			rendered_content = (
				<React.Fragment>
					<p style={{ padding: '1rem', marginTop: '1rem' }}>
						<IoIosInformationCircleOutline /> A lot of rooms that you can share together with roommate,
						pool, BBQ Pot
						<br />
						<br />
						<IoIosPeople /> Total 52 people booked this hostel
						<br />
						<br />
						<MdUpdate /> Published on 1 Jan 2018
					</p>
				</React.Fragment>
			);
		} else {
			rendered_content = <Comment />;
		}
		return (
			<React.Fragment>
				<OutestContainer fluid>
					<UserNavColumn2>
						<Row style={{ textAlign: 'center' }}>
							<Col md={12}>
								<Image
									src={`/uploads/photo_5e80ac613cf8003f60ea5140.jpg`}
									rounded
									width="280"
									height="220"
								/>
							</Col>
						</Row>
						<Row style={{ textAlign: 'center' }}>
							<Col md={12}>
								<CustomNameLabel>The Ayutthaya Hostel</CustomNameLabel>
							</Col>
						</Row>
						<Row style={{ textAlign: 'left', marginTop: '1rem' }}>
							<Col md={12}>
								<ul>
									<li>
										<GiMoneyStack /> 900 baht / night
									</li>
									<br />
									<li>
										<FiBox /> Capacity: 15 people
									</li>
									<br />
									<li>
										<FiPhone /> 0946753822
									</li>
									<br />
									<li>
										<AiOutlineMail /> adm@admin.in.th
									</li>
								</ul>
							</Col>
						</Row>
					</UserNavColumn2>
					<ContentContainer fluid>
						<Nav variant="tabs" defaultActiveKey="details">
							<Nav.Item>
								<Nav.Link eventKey="details" onClick={() => this.onChangeAction('details')}>
									Details / Information
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="comment" onClick={() => this.onChangeAction('comment')}>
									Comments
								</Nav.Link>
							</Nav.Item>
						</Nav>
						{rendered_content}
					</ContentContainer>
				</OutestContainer>
			</React.Fragment>
		);
	}
}
