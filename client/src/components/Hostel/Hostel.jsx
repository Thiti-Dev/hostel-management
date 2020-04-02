import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
import { IoMdPeople, IoIosInformationCircleOutline, IoIosPeople, IoIosCloudyNight, IoMdLogIn } from 'react-icons/io';
import { FiMapPin } from 'react-icons/fi';
import { GiMoneyStack, GiTakeMyMoney } from 'react-icons/gi';
import { MdMoveToInbox, MdUpdate, MdPersonOutline } from 'react-icons/md';
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

class Hostel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentAction: 'details',
			hostelDetail: null,
			totalBooked: 0,
			hostelComments: null
		};
	}
	onChangeAction(action) {
		console.log('Changing action to : ' + action);
		this.setState({ currentAction: action });
	}

	async fetchHostelData(slug) {
		try {
			const detail_request = await axios.get(`/api/hostels/${slug}`);
			//console.log(detail_request);
			this.setState({ hostelDetail: detail_request.data.data, totalBooked: detail_request.data.total_booked });
			this.fetchHostelComments(detail_request.data.data._id);
		} catch (error) {
			// Redirect to page not found
		}
	}

	async fetchHostelComments(hostelId) {
		try {
			const comments_request = await axios.get(`/api/hostels/${hostelId}/comments`);
			console.log(comments_request);
			this.setState({ hostelComments: comments_request.data.data });
		} catch (error) {
			// Redirect to page not found
		}
	}

	onCommentSuccess(msg) {
		const appended_msg = {
			user: {
				username: this.props.auth.user.username,
				photo: this.props.auth.user.photo
			},
			message: msg,
			createdAt: new Date(Date.now())
		};
		this.setState({
			hostelComments: [ appended_msg, ...this.state.hostelComments ]
		});
	}

	componentDidMount() {
		console.log(this.props.match.params.hostelSlug);
		this.fetchHostelData(this.props.match.params.hostelSlug);
	}
	render() {
		const { currentAction, hostelDetail, totalBooked, hostelComments } = this.state;
		let rendered_content;
		if (currentAction === 'details') {
			if (!hostelDetail) {
				rendered_content = <Spinner style={{ textAlign: 'center' }} animation="border" variant="secondary" />;
			} else {
				rendered_content = (
					<React.Fragment>
						<p style={{ padding: '1rem', marginTop: '1rem' }}>
							<IoIosInformationCircleOutline /> {hostelDetail.description}
							<br />
							<br />
							<IoMdLogIn /> This hostel has been booked {totalBooked} times
							<br />
							<br />
							<MdUpdate /> Published on{' '}
							<Moment format="D MMMM YYYY" withTitle>
								{hostelDetail.createdAt}
							</Moment>
							<br />
							<br />
							<MdPersonOutline />{' '}
							<Link to={`/user/${hostelDetail.owner.username}`}>{hostelDetail.owner.username}</Link> is
							the owner
						</p>
					</React.Fragment>
				);
			}
		} else {
			rendered_content = (
				<Comment
					comments_data={hostelComments}
					hostelId={hostelDetail._id}
					on_success={this.onCommentSuccess.bind(this)}
				/>
			);
		}
		let rendered_hostel_detail;
		if (!hostelDetail) {
			rendered_hostel_detail = <Spinner style={{ textAlign: 'center' }} animation="border" variant="secondary" />;
		} else {
			rendered_hostel_detail = (
				<React.Fragment>
					<Row style={{ textAlign: 'center' }}>
						<Col md={12}>
							<Image src={`/uploads/${hostelDetail.photo}`} rounded width="280" height="220" />
						</Col>
					</Row>
					<Row style={{ textAlign: 'center' }}>
						<Col md={12}>
							<CustomNameLabel>{hostelDetail.name}</CustomNameLabel>
						</Col>
					</Row>
					<Row style={{ textAlign: 'left', marginTop: '1rem' }}>
						<Col md={12}>
							<ul>
								<li>
									<GiMoneyStack /> {hostelDetail.price} baht / night
								</li>
								<br />
								<li>
									<FiBox /> Capacity: {hostelDetail.capacity} people
								</li>
								<br />
								{hostelDetail.phone ? (
									<React.Fragment>
										<li>
											<FiPhone /> {hostelDetail.phone}
										</li>
										<br />
									</React.Fragment>
								) : null}

								{hostelDetail.email ? (
									<React.Fragment>
										<li>
											<AiOutlineMail /> {hostelDetail.email}
										</li>
										<br />
									</React.Fragment>
								) : null}
							</ul>
						</Col>
					</Row>
				</React.Fragment>
			);
		}
		return (
			<React.Fragment>
				<OutestContainer fluid>
					<UserNavColumn2>{rendered_hostel_detail}</UserNavColumn2>
					<ContentContainer fluid>
						<Nav variant="tabs" defaultActiveKey="details">
							<Nav.Item>
								<Nav.Link eventKey="details" onClick={() => this.onChangeAction('details')}>
									Details / Information
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="comment" onClick={() => this.onChangeAction('comment')}>
									Comments<Badge variant="light">{hostelComments ? hostelComments.length : 0}</Badge>
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

const mapStateToProps = (state) => ({
	auth: state.auth
});
export default connect(mapStateToProps)(Hostel);
