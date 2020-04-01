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
	white-space: nowrap;
	margin-top: 2rem;
`;

const CustomUserNameLabel = styled.p`
	font-size: 1.8rem;
	font-weight: 100;
	white-space: nowrap;
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
	render() {
		return (
			<OutestContainer fluid>
				<UserNavColumn2>
					<Row style={{ textAlign: 'center' }}>
						<Col md={12}>
							<Image
								src="https://i1.wp.com/unseenthaisub.com/wp-content/uploads/2017/10/shot_caller_02.jpg"
								rounded
								width="280"
								height="220"
							/>
						</Col>
					</Row>
					<Row style={{ textAlign: 'center' }}>
						<Col md={12}>
							<CustomNameLabel>Thiti Mahawannakit</CustomNameLabel>
							<CustomUserNameLabel>@aaw0kenn</CustomUserNameLabel>
						</Col>
					</Row>
					<Row style={{ textAlign: 'center' }}>
						<Col md={12}>
							<CustomUlHolder>
								<CustomNavList active>Booking History</CustomNavList>
								<CustomNavList>Published Hostel</CustomNavList>
							</CustomUlHolder>
						</Col>
					</Row>
				</UserNavColumn2>
				<ContentContainer fluid>
					<BookHistory />
				</ContentContainer>
			</OutestContainer>
		);
	}
}
