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

const MySwal = withReactContent(Swal);
const MainContainer = styled(Container)`
	padding: 2rem;
	font-family: 'Courier New', Courier, monospace;

`;

const UserNameText = styled.p`
	font-size: 2rem;
	font-weight: bolder;
	border-bottom: 1.2px solid whitesmoke;
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

const ProfileBox = styled.div`
	border: 1px solid black;
	padding: 20px !important;
	border-radius: 10px;
`;

const LabelProfileInput = styled(Col)`
	text-align: right;
	line-height: 2.5;
	white-space: nowrap; /* Disabled auto wrap */
`;

const CustomRow = styled(Row)`
	margin-bottom: 1rem;
`;

const CustomCancleButton = styled(AwesomeButton)`
	width: 100%;
`;

export default class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.onNavClicked = this.onNavClicked.bind(this);
		this.state = {
			currentAction: 'profile',
			cachedCredential: {},
			credentials: {},
			alreadyChanged: false, // store if user already apply a change
			makeAnyChanges: false,
			passwordCredential: {
				currentPassword: '',
				newPassword: '',
				newPassword2: ''
			}
		};
	}

	clearPasswordCredential() {
		return {
			currentPassword: '',
			newPassword: '',
			newPassword2: ''
		};
	}

	discardChanges() {
		//console.log('trying to discard all the changes');
		Swal.fire({
			title: 'Discard changes?',
			text: 'Are you sure that you want to discard your changes!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes'
		}).then((result) => {
			if (result.value) {
				this.setState({ currentAction: 'profile' });
				// Set make any change to false => reset the clone of credential to be equal to the fetched old one ( current in db )
				this.setState({
					makeAnyChanges: false,
					credentials: this.state.cachedCredential,
					passwordCredential: this.clearPasswordCredential() // clear the password credential
				});
			}
		});
	}

	async componentDidMount() {
		try {
			const credential_request = await axios.get('/api/auth/mycredentials');
			let _credentials = credential_request.data.data;
			_credentials.dateOfBirth = new Date(_credentials.dateOfBirth); // fixing the date-picker error
			this.setState({ cachedCredential: _credentials, credentials: _credentials });
		} catch (error) {
			// Reload the page when an error occurs [ BAD PRACTICE => later will redirect to new component which  show the error status and a button to back to home page]
			window.location.reload(false);
		}
		/*let dummy_cred = {
			firstName: 'Thiti',
			lastName: 'Mahawannakit',
			email: 'dev@admin.in.th',
			dateOfBirth: new Date(Date.now())
		};*/
	}

	onNavClicked(action) {
		switch (action) {
			case 'profile':
				console.log('Viewing profile');
				if (this.state.currentAction !== 'profile') {
					if (this.state.makeAnyChanges) {
						Swal.fire({
							title: 'Discard changes?',
							text: 'Are you sure that you want to discard your changes!',
							icon: 'warning',
							showCancelButton: true,
							confirmButtonColor: '#3085d6',
							cancelButtonColor: '#d33',
							confirmButtonText: 'Yes'
						}).then((result) => {
							if (result.value) {
								this.setState({ currentAction: 'profile' });
								// Set make any change to false => reset the clone of credential to be equal to the fetched old one ( current in db )
								this.setState({
									makeAnyChanges: false,
									credentials: this.state.cachedCredential,
									passwordCredential: this.clearPasswordCredential() // clear the password credential
								});
							}
						});
					} else {
						this.setState({ currentAction: 'profile' });
					}
				}
				//this.setState({ currentAction: 'profile' });
				break;
			case 'editProfile':
				console.log('Editing profile');
				if (this.state.currentAction !== 'editProfile' && this.state.currentAction !== 'profile') {
					if (this.state.makeAnyChanges) {
						Swal.fire({
							title: 'Discard changes?',
							text: 'Are you sure that you want to discard your changes!',
							icon: 'warning',
							showCancelButton: true,
							confirmButtonColor: '#3085d6',
							cancelButtonColor: '#d33',
							confirmButtonText: 'Yes'
						}).then((result) => {
							if (result.value) {
								this.setState({ currentAction: 'editProfile' });
								// Set make any change to false => reset the clone of credential to be equal to the fetched old one ( current in db )
								this.setState({
									makeAnyChanges: false,
									credentials: this.state.cachedCredential,
									passwordCredential: this.clearPasswordCredential() // clear the password credential
								});
							}
						});
					} else {
						this.setState({ currentAction: 'editProfile' }); // doesn't make any changes
					}
				} else {
					if (this.state.currentAction === 'profile') this.setState({ currentAction: 'editProfile' }); // ignore if in profile
				}
				break;
			case 'changePassword':
				console.log('Editing profile password');
				if (this.state.currentAction !== 'changePassword' && this.state.currentAction !== 'profile') {
					if (this.state.makeAnyChanges) {
						Swal.fire({
							title: 'Discard changes?',
							text: 'Are you sure that you want to discard your changes!',
							icon: 'warning',
							showCancelButton: true,
							confirmButtonColor: '#3085d6',
							cancelButtonColor: '#d33',
							confirmButtonText: 'Yes'
						}).then((result) => {
							if (result.value) {
								this.setState({ currentAction: 'changePassword' });
								// Set make any change to false => reset the clone of credential to be equal to the fetched old one ( current in db )
								this.setState({
									makeAnyChanges: false,
									credentials: this.state.cachedCredential,
									passwordCredential: this.clearPasswordCredential() // clear the password credential
								});
							}
						});
					} else {
						this.setState({ currentAction: 'changePassword' }); // doesn't make any changes
					}
				} else {
					if (this.state.currentAction === 'profile') this.setState({ currentAction: 'changePassword' }); // ignore if in profile
				}
				break;
			default:
				break;
		}
	}

	inputHandler(event) {
		let key = event.target.name;
		let value = event.target.value;
		if (!this.state.makeAnyChanges) {
			this.setState({ makeAnyChanges: true });
		}
		this.setState((prevState) => ({
			credentials: {
				...prevState.credentials,
				[key]: value
			}
		}));
	}

	inputHandlerForPasswordCredentials(event) {
		let key = event.target.name;
		let value = event.target.value;
		if (!this.state.makeAnyChanges) {
			this.setState({ makeAnyChanges: true });
		}
		this.setState((prevState) => ({
			passwordCredential: {
				...prevState.passwordCredential,
				[key]: value
			}
		}));
	}

	async onChangePassword(next) {
		//console.log('Fetching put from request');

		try {
			const request = await axios.put('/api/auth/updatepassword', this.state.passwordCredential);
			next();
			setTimeout(() => {
				MySwal.fire({
					position: 'top',
					icon: 'success',
					title: 'Your password successfully updated',
					showConfirmButton: false,
					timer: 1500,
					timerProgressBar: true,
					backdrop: false
				});
				this.setState({ currentAction: 'profile' });
				// Set make any change to false => reset the clone of credential to be equal to the fetched old one ( current in db )
				this.setState({
					makeAnyChanges: false,
					credentials: this.state.cachedCredential,
					passwordCredential: this.clearPasswordCredential() // clear the password credential
				});
			}, 800);
		} catch (error) {
			//console.log(error.response);
			let error_msg = error.response.data.errors || 'Server Error , Try later sometime';
			next(false, 'Somethings went wrong . . .');
			setTimeout(() => {
				MySwal.fire({
					position: 'top',
					icon: 'error',
					title: error_msg,
					showConfirmButton: false,
					timer: 1500,
					timerProgressBar: true,
					backdrop: false
				});
			}, 600);
		}
	}

	passwordChangeShouldProceed() {
		if (
			this.state.currentAction === 'changePassword' &&
			this.state.makeAnyChanges &&
			this.state.passwordCredential.currentPassword.length > 0 &&
			this.state.passwordCredential.newPassword.length > 0 &&
			this.state.passwordCredential.newPassword2 === this.state.passwordCredential.newPassword
		) {
			return true;
		}
		return false;
	}

	async onUpdateDetails(next) {
		try {
			const update_request = await axios.put('/api/auth/updatedetails', this.state.credentials);
			next();
			this.setState({ cachedCredential: this.state.credentials });
			this.goToProfileSection_response('profile');
		} catch (error) {}
	}

	goToProfileSection_response(msg) {
		//Some dynamic msg => will be using this as reference for all the of messing up above [if have time xD]
		setTimeout(() => {
			MySwal.fire({
				position: 'top',
				icon: 'success',
				title: `Your ${msg} successfully updated`,
				showConfirmButton: false,
				timer: 1500,
				timerProgressBar: true,
				backdrop: false
			});
			this.setState({ currentAction: 'profile' });
			// Set make any change to false => reset the clone of credential to be equal to the fetched old one ( current in db )
			this.setState({
				makeAnyChanges: false,
				credentials: this.state.cachedCredential,
				passwordCredential: this.clearPasswordCredential() // clear the password credential
			});
		}, 800);
	}

	render() {
		const { currentAction, cachedCredential, credentials, makeAnyChanges, passwordCredential } = this.state;
		return (
			<MainContainer>
				<Row style={{ textAlign: 'center' }}>
					<Col md={12}>
						<Image
							src="https://dailyreview.com.au/wp-content/uploads/2018/03/CALLER-1.jpg"
							width="150"
							height="150"
							roundedCircle
						/>
						<UserNameText>aaw0kenn</UserNameText>
					</Col>
				</Row>
				<Row>
					<Col md={3}>
						<div>
							<CustomUlHolder>
								<CustomNavList
									active={currentAction === 'profile' ? true : false}
									onClick={() => this.onNavClicked('profile')}
								>
									Profile
								</CustomNavList>
								<CustomNavList
									active={currentAction === 'editProfile' ? true : false}
									onClick={() => this.onNavClicked('editProfile')}
								>
									Edit Profile
								</CustomNavList>
								<CustomNavList
									active={currentAction === 'changePassword' ? true : false}
									onClick={() => this.onNavClicked('changePassword')}
								>
									Change password
								</CustomNavList>
							</CustomUlHolder>
						</div>
					</Col>
					<Col md={9}>
						<p>My profile</p>
						<ProfileBox>
							{currentAction === 'editProfile' || currentAction === 'profile' ? (
								<React.Fragment>
									<CustomRow>
										<LabelProfileInput md={3}>First Name</LabelProfileInput>
										<Col md={9}>
											<Form.Control
												placeholder="Firstname"
												disabled={currentAction === 'editProfile' ? false : true}
												value={
													currentAction === 'editProfile' ? (
														credentials.firstName
													) : (
														cachedCredential.firstName
													)
												}
												name="firstName"
												onChange={this.inputHandler.bind(this)}
											/>
										</Col>
									</CustomRow>
									<CustomRow>
										<LabelProfileInput md={3}>Last Name</LabelProfileInput>
										<Col md={9}>
											<Form.Control
												placeholder="Lastname"
												value={
													currentAction === 'editProfile' ? (
														credentials.lastName
													) : (
														cachedCredential.lastName
													)
												}
												name="lastName"
												onChange={this.inputHandler.bind(this)}
												disabled={currentAction === 'editProfile' ? false : true}
											/>
										</Col>
									</CustomRow>
									<CustomRow>
										<LabelProfileInput md={3}>Date of Birth</LabelProfileInput>
										<Col md={9}>
											<DatePicker
												required
												value={credentials.dateOfBirth}
												onChange={(date) =>
													this.setState((prevState) => ({
														credentials: {
															...prevState.credentials,
															dateOfBirth: date
														}
													}))}
												disabled={currentAction === 'editProfile' ? false : true}
											/>
										</Col>
									</CustomRow>
									<CustomRow>
										<LabelProfileInput md={3}>Email Address</LabelProfileInput>
										<Col md={9}>
											<Form.Control
												placeholder="Email"
												value={
													currentAction === 'editProfile' ? (
														credentials.email
													) : (
														cachedCredential.email
													)
												}
												name="email"
												onChange={this.inputHandler.bind(this)}
												disabled={currentAction === 'editProfile' ? false : true}
											/>
										</Col>
									</CustomRow>
									{currentAction === 'editProfile' && makeAnyChanges ? (
										<React.Fragment>
											<Animated
												animationIn="fadeInLeft"
												animationOut="fadeOutLeft"
												animationInDuration={800}
												animationOutDuration={800}
												isVisible={currentAction === 'editProfile' && makeAnyChanges}
											>
												<CustomRow>
													<Col md={12}>
														<AwesomeButtonProgress
															style={{ width: '100%' }}
															type="secondary"
															size="medium"
															action={(element, next) =>
																setTimeout(() => {
																	this.onUpdateDetails(next);
																}, 500)}
															loadingLabel="Applying your changes , Please be patient . . ."
															resultLabel="👍🏽"
														>
															Apply change
														</AwesomeButtonProgress>
													</Col>
												</CustomRow>
												<CustomRow>
													<Col md={12}>
														<CustomCancleButton type="reddit" size="medium">
															Discard change
														</CustomCancleButton>
													</Col>
												</CustomRow>
											</Animated>
										</React.Fragment>
									) : null}
								</React.Fragment>
							) : (
								<React.Fragment>
									<CustomRow>
										<LabelProfileInput md={3}>Current Password</LabelProfileInput>
										<Col md={9}>
											<Form.Control
												type="password"
												placeholder="Current Password"
												value={passwordCredential.currentPassword}
												name="currentPassword"
												onChange={this.inputHandlerForPasswordCredentials.bind(this)}
											/>
										</Col>
									</CustomRow>
									<CustomRow>
										<LabelProfileInput md={3}>New Password</LabelProfileInput>
										<Col md={9}>
											<Form.Control
												type="password"
												placeholder="New Password"
												value={passwordCredential.newPassword}
												name="newPassword"
												onChange={this.inputHandlerForPasswordCredentials.bind(this)}
											/>
										</Col>
									</CustomRow>
									<CustomRow>
										<LabelProfileInput md={3}>Confirm Password</LabelProfileInput>
										<Col md={9}>
											<Form.Control
												type="password"
												placeholder="Confirm New Password"
												value={passwordCredential.newPassword2}
												name="newPassword2"
												onChange={this.inputHandlerForPasswordCredentials.bind(this)}
												isInvalid={
													passwordCredential.newPassword !== passwordCredential.newPassword2
												}
											/>
										</Col>
									</CustomRow>
									{this.passwordChangeShouldProceed() ? (
										<React.Fragment>
											<Animated
												animationIn="fadeInUp"
												animationOut="fadeOutDown"
												animationInDuration={800}
												animationOutDuration={800}
												isVisible={this.passwordChangeShouldProceed()}
											>
												<CustomRow>
													<Col md={12}>
														<AwesomeButtonProgress
															style={{ width: '100%' }}
															type="secondary"
															size="medium"
															action={(element, next) =>
																setTimeout(() => {
																	this.onChangePassword(next); // works because using arrow function => bind isn't needed
																}, 500)}
															loadingLabel="Applying your changes , Please be patient . . ."
															resultLabel="👍🏽"
														>
															Apply change
														</AwesomeButtonProgress>
													</Col>
												</CustomRow>
												<CustomRow>
													<Col md={12}>
														<CustomCancleButton
															type="reddit"
															size="medium"
															action={() => this.discardChanges()}
														>
															Discard change
														</CustomCancleButton>
													</Col>
												</CustomRow>
											</Animated>
										</React.Fragment>
									) : null}
								</React.Fragment>
							)}
						</ProfileBox>
					</Col>
				</Row>
			</MainContainer>
		);
	}
}
