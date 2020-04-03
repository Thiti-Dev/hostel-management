import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Fab, Action } from 'react-tiny-fab';
import { FiNavigation2 } from 'react-icons/fi';
import { TiHomeOutline } from 'react-icons/ti';
import { connect } from 'react-redux';
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

const MainContainer = styled(Container)`
    padding: 3rem;
    margin-left: 5rem;
`;

const HostelHolder = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	min-height: 8rem;
	margin-bottom: 2rem;
	width: 50vw;
	&:hover {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		cursor: pointer;
	}
`;
const CustomPhotoInside = styled.div`
	background-size: cover;
	background-position: center;
    background-image: url('${(props) => props.photo_url}');
	height:  10rem;
	width: 15rem;
	border-radius: 1rem;
`;
const CustomInformationBox = styled.div`
	margin-left: 1rem;
	margin-top: 0.5rem;
`;

class AdminPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hostels: null,
			filter: 1,
			cached_filtered: null
		};
		this.onActionPanelShown = this.onActionPanelShown.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.user.role != 'admin') {
			this.props.history.push('401'); // un authorized
		} else {
			document.title = 'Admin Panel';
			axios
				.get('/api/hostels')
				.then((res) => {
					console.log(res);
					this.setState({ hostels: res.data.data });
				})
				.catch((err) => {
					console.log(err.response.data);
				});
		}
	}

	async onActionPanelShown(hostelId) {
		const { value: action } = await Swal.fire({
			title: 'Select an action',
			input: 'select',
			inputOptions: {
				verify: 'Verify this hostel',
				unverify: 'Un-verify this hostel',
				delete: 'Delete a hostel'
			},
			inputPlaceholder: 'Select an action',
			showCancelButton: true,
			inputValidator: (value) => {
				return new Promise((resolve) => {
					if (value === 'verify') {
						resolve();
					} else if (value === 'unverify') {
						resolve();
					} else if (value === 'delete') {
						resolve();
					} else {
						resolve('You have to select somethings :)');
					}
				});
			}
		});

		if (action) {
			if (action === 'verify') {
				try {
					const verify_request = await axios.get(`/api/hostels/${hostelId}/verify`);
					MySwal.fire({
						position: 'top',
						icon: 'success',
						title: 'The hostel is verified',
						showConfirmButton: false,
						timer: 1500,
						timerProgressBar: true,
						backdrop: true
					});

					this.setState((prevState) => ({
						hostels: prevState.hostels.map(
							(obj) => (obj._id === hostelId ? Object.assign(obj, { validated: true }) : obj)
						)
					}));
				} catch (error) {
					MySwal.fire({
						position: 'top',
						icon: 'error',
						title: 'Somethings went wrong , might be server issues',
						showConfirmButton: false,
						timer: 3000,
						timerProgressBar: true,
						backdrop: true
					});
				}
			} else if (action === 'unverify') {
				try {
					const verify_request = await axios.get(`/api/hostels/${hostelId}/unverify`);
					MySwal.fire({
						position: 'top',
						icon: 'success',
						title: 'The hostel is now un-verified',
						showConfirmButton: false,
						timer: 1500,
						timerProgressBar: true,
						backdrop: true
					});

					this.setState((prevState) => ({
						hostels: prevState.hostels.map(
							(obj) => (obj._id === hostelId ? Object.assign(obj, { validated: false }) : obj)
						)
					}));
				} catch (error) {
					MySwal.fire({
						position: 'top',
						icon: 'error',
						title: 'Somethings went wrong , might be server issues',
						showConfirmButton: false,
						timer: 3000,
						timerProgressBar: true,
						backdrop: true
					});
				}
			} else if (action === 'delete') {
				try {
					const verify_request = await axios.delete(`/api/hostels/${hostelId}`);
					MySwal.fire({
						position: 'top',
						icon: 'success',
						title: 'The hostel is deleted',
						showConfirmButton: false,
						timer: 1500,
						timerProgressBar: true,
						backdrop: true
					});

					this.setState({
						hostels: this.state.hostels.filter(function(hostel) {
							return hostel._id !== hostelId;
						})
					});
				} catch (error) {
					MySwal.fire({
						position: 'top',
						icon: 'error',
						title: 'Somethings went wrong , might be server issues',
						showConfirmButton: false,
						timer: 3000,
						timerProgressBar: true,
						backdrop: true
					});
				}
			}
		}
	}

	render() {
		const { hostels, filter } = this.state;
		let rendered_place;
		if (!hostels) {
			rendered_place = <Spinner style={{ textAlign: 'center' }} animation="border" variant="secondary" />;
		} else {
			let filtered_hostel;
			if (filter === 1)
				rendered_place = hostels.map((hostel, key) => {
					return (
						<React.Fragment key={key}>
							<HostelHolder onClick={() => this.onActionPanelShown(hostel._id)}>
								<CustomPhotoInside
									photo_url={`https://storage.googleapis.com/hosteloga-uploads/${hostel.photo}`}
								/>
								<CustomInformationBox>
									<GoLocation /> {hostel.name}{' '}
									{hostel.validated ? (
										<Badge variant="success">Verified</Badge>
									) : (
										<Badge variant="danger">Un-verified</Badge>
									)}
									<ul>
										<li>
											<FiMapPin /> {hostel.address}
										</li>
										<li>
											<IoIosInformationCircleOutline /> {hostel.description}
										</li>
									</ul>
								</CustomInformationBox>
							</HostelHolder>
						</React.Fragment>
					);
				});
			else {
				filtered_hostel = hostels.filter((hostel) => {
					return !hostel.validated;
				});
				rendered_place = filtered_hostel.map((hostel, key) => {
					return (
						<React.Fragment key={key}>
							<HostelHolder onClick={() => this.onActionPanelShown(hostel._id)}>
								<CustomPhotoInside
									photo_url={`https://storage.googleapis.com/hosteloga-uploads/${hostel.photo}`}
								/>
								<CustomInformationBox>
									<GoLocation /> {hostel.name}{' '}
									{hostel.validated ? (
										<Badge variant="success">Verified</Badge>
									) : (
										<Badge variant="danger">Un-verified</Badge>
									)}
									<ul>
										<li>
											<FiMapPin /> {hostel.address}
										</li>
										<li>
											<IoIosInformationCircleOutline /> {hostel.description}
										</li>
									</ul>
								</CustomInformationBox>
							</HostelHolder>
						</React.Fragment>
					);
				});
			}
		}

		return (
			<React.Fragment>
				<Fab icon={<FiNavigation2 />} mainButtonStyles={{ backgroundColor: '#ff0000' }}>
					<Action
						text="Back to home"
						onClick={() => this.props.history.push('/home')}
						style={{ backgroundColor: '#ed0c5e' }}
					>
						<TiHomeOutline />
					</Action>
				</Fab>
				<MainContainer fluid>
					<Nav variant="tabs" defaultActiveKey="all" style={{ marginBottom: '1rem' }}>
						<Nav.Item>
							<Nav.Link eventKey="all" onClick={() => this.setState({ filter: 1 })}>
								All hostel
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="un-verify" onClick={() => this.setState({ filter: 2 })}>
								Un-verified
							</Nav.Link>
						</Nav.Item>
					</Nav>
					{rendered_place}
				</MainContainer>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth
});
export default connect(mapStateToProps)(AdminPanel);
