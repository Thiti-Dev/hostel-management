import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
	Button,
	//Jumbotron,
	Container,
	Spinner,
	//Breadcrumb,
	Toast,
	Row,
	Col,
	Card,
	Image,
	Badge,
	Form,
	InputGroup,
	Alert
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

//
// ─── MY OWN LIB ─────────────────────────────────────────────────────────────────
//
import OnScreenSensor from 'react-onscreensensor';
import * as Func from '../../utils/Functions';
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── VALIDATOR ──────────────────────────────────────────────────────────────────
//
import _isRegistrationValid from './validation/register';

const MainContainer = styled(Container)`
	padding: 5vw;
	font-family: 'Courier New', Courier, monospace;
`;
const LabelText = styled.div`
	background: white;
	padding: 1rem;
	position: absolute;
	top: 50%;
	left: 50%;
	opacity: 0.7;
	transform: translate(-50%, -50%);
	font-family: 'Courier New', Courier, monospace;
	text-shadow: 0.08vw 0.08vw 0.08vw #000000;
	color: rgba(255, 255, 255, 0.589);
	user-select: none;
	text-align: center;
	border-radius: 5rem;
	white-space: nowrap;
	text-overflow: ellipsis;
`;
const CustomErrorFeedback = styled.p`
	color: red;
	font-size: 0.9rem;
`;

const AlertContainer = styled.div`
	position: absolute;
	top: 42%;
	left: 15%;
`;

const regisBg =
	'https://images.unsplash.com/photo-1553881651-43348b2ca74e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80';

//
// ─── PROTECTED From Rerendering by hook ──────────────────────────────────────────────────────────────────
//
const sleep = (m) => new Promise((r) => setTimeout(r, m));
const blackListValidation = { username: [], email: [] }; // Initialize the empty array for the blacklist data to be filled
const cached_error_msg = {};
// ────────────────────────────────────────────────────────────────────────────────
function Register() {
	const myForm = useRef(); // Referencing to our form
	const [ validated, setValidated ] = useState(false); // always validate by deafult ==> for now false
	const [ errors, setError ] = useState({}); // empty error at first
	const [ credentials, setCredential ] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		username: '',
		firstName: '',
		lastName: '',
		dateOfBirth: new Date('1998-01-01T14:48:00.000Z'),
		gender: ''
	});
	const [ termAccept, setTermAccept ] = useState(false);
	const [ _regisDone, setDoneRegis ] = useState(false);

	const handleSubmit = async (next) => {
		if (!_isRegistrationValid(credentials) || !termAccept) {
			return next(false, '💢 Could not proceed . . . ');
		}
		try {
			const res = await axios.post('/api/auth/register', credentials);
			console.log(res);
			next(); // Thumbing up
			setDoneRegis(true); // Successfully regis , hide the form and then show the alert text with the smooth transistion
		} catch (error) {
			// destructuring
			let _errors = error.response.data.errors;

			console.log(_errors);
			setError(_errors); // applied the error

			Object.assign(cached_error_msg, _errors); // storing error msg in cached

			if (_errors.username) {
				// Unable to use that username
				blackListValidation['username'].push(credentials.username);
			}
			if (_errors.email) {
				blackListValidation['email'].push(credentials.email);
			}
			next(false, '💢 Could not proceed . . . ');
		}
	};

	const formInputHandler = (event) => {
		let key = event.target.name;
		let value = event.target.value;

		if (errors[key]) {
			//if the errors is exist and user just typed // remove some letter on the input => remove the error
			delete errors[key];
		}

		if (blackListValidation[key]) {
			if (blackListValidation[key].includes(value)) {
				setError((prevState) => {
					return { ...prevState, [key]: cached_error_msg[key] };
				});
			}
		}

		setCredential((prevState) => {
			return { ...prevState, [key]: value };
		});
	};
	return (
		<MainContainer fluid>
			<Row>
				<Col>
					<Parallax className="parallax-img" bgImage={regisBg} strength={500} blur={{ min: -15, max: 25 }}>
						<div style={{ height: 500 }}>
							<LabelText>📅 Be our membership , Lots of features will be unlocked</LabelText>
						</div>
					</Parallax>
				</Col>
				<Col>
					<Form ref={myForm} noValidate validated={false} onSubmit={(event) => event.preventDefault()}>
						<Form.Row>
							<Form.Group as={Col} md="6" controlId="validationCustom01">
								<Form.Label>First name</Form.Label>
								<Form.Control
									name="firstName"
									// onChange={(e) => {
									// 	let _value = e.target.value;
									// 	setCredential((prevState) => {
									// 		return { ...prevState, firstName: _value };
									// 	});
									// }}
									value={credentials.firstName}
									onChange={formInputHandler}
									required
									type="text"
									placeholder="First name"
									autoComplete="off"
									maxLength={20}
									isValid={credentials.firstName.length >= 3}
									isInvalid={credentials.firstName.length < 3}
								/>
								<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									{credentials.firstName.length === 0 ? null : 'It is too short'}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} md="6" controlId="validationCustom02">
								<Form.Label>Last name</Form.Label>
								<Form.Control
									autoComplete="off"
									required
									type="text"
									placeholder="Last name"
									name="lastName"
									value={credentials.lastName}
									onChange={formInputHandler}
									maxLength={20}
									isValid={credentials.lastName.length >= 3}
									isInvalid={credentials.lastName.length < 3}
								/>
								<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									{credentials.lastName.length === 0 ? null : 'It is too short'}
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group as={Col} md="5" controlId="validationCustomUsername">
								<Form.Label>Username</Form.Label>
								<InputGroup>
									<InputGroup.Prepend>
										<InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
									</InputGroup.Prepend>
									<Form.Control
										type="text"
										placeholder="Username"
										aria-describedby="inputGroupPrepend"
										required
										autoComplete="off"
										name="username"
										value={credentials.username}
										onChange={formInputHandler}
										maxLength={12}
										isInvalid={
											credentials.username.length === 0 ||
											credentials.username.length < 3 ||
											errors.username
										}
										isValid={credentials.username.length >= 3}
									/>
									<Form.Control.Feedback type="invalid">
										{!errors.username ? credentials.username.length === 0 ? null : (
											'Little bit short!'
										) : (
											errors.username
										)}
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
							<Form.Group as={Col} md="7" controlId="validationCustomEmail">
								<Form.Label>Email</Form.Label>
								<Form.Control
									autoComplete="off"
									required
									type="email"
									placeholder="example@xxx.com"
									name="email"
									value={credentials.email}
									onChange={formInputHandler}
									isValid={Func.validateEmail(credentials.email) && !errors.email}
									isInvalid={!Func.validateEmail(credentials.email) || errors.email}
								/>
								<Form.Control.Feedback>Looks valid!</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									{!errors.email ? credentials.email.length === 0 ? null : (
										'Invalid Email!'
									) : (
										errors.email
									)}
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group as={Col} md="6" controlId="validationCustomPassword">
								<Form.Label>Password</Form.Label>
								<InputGroup>
									<InputGroup.Prepend>
										<InputGroup.Text id="inputGroupPrepend2">🔑</InputGroup.Text>
									</InputGroup.Prepend>
									<Form.Control
										type="password"
										placeholder="Password"
										aria-describedby="inputGroupPrepend2"
										required
										autoComplete="off"
										name="password"
										value={credentials.password}
										onChange={formInputHandler}
										maxLength={50}
										isValid={
											credentials.password.length > 0 &&
											credentials.password === credentials.confirmPassword
										}
										isInvalid={
											(credentials.confirmPassword.length > 0 &&
												credentials.password !== credentials.confirmPassword) ||
											credentials.password.length === 0
										}
									/>
									<Form.Control.Feedback type="invalid">{null}</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
							<Form.Group as={Col} md="6" controlId="validationCustomConfirmPassword">
								<Form.Label>Confirm Password</Form.Label>
								<InputGroup>
									<InputGroup.Prepend>
										<InputGroup.Text id="inputGroupPrepend3">🔑</InputGroup.Text>
									</InputGroup.Prepend>
									<Form.Control
										type="password"
										placeholder="Confirm password"
										aria-describedby="inputGroupPrepend3"
										required
										autoComplete="off"
										name="confirmPassword"
										value={credentials.confirmPassword}
										onChange={formInputHandler}
										maxLength={50}
										isValid={
											credentials.password.length > 0 &&
											credentials.password === credentials.confirmPassword
										}
										isInvalid={
											(credentials.password.length > 0 &&
												credentials.password !== credentials.confirmPassword) ||
											credentials.confirmPassword.length === 0
										}
									/>
									<Form.Control.Feedback type="invalid">{null}</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group as={Col} md="6" controlId="validationCustomDob">
								<Form.Label>Date Of Birth</Form.Label>
								<br />
								<DatePicker
									onChange={(date) =>
										setCredential((prevState) => {
											return { ...prevState, dateOfBirth: date };
										})}
									value={credentials.dateOfBirth}
									required
								/>
								<br />
								<CustomErrorFeedback>
									{!credentials.dateOfBirth ? 'Please select your birthdate' : null}
								</CustomErrorFeedback>
							</Form.Group>
							<Form.Group as={Col} md="6" controlId="validationCustomGender">
								<Form.Check.Label>Gender</Form.Check.Label>
								<Form.Check
									required
									custom
									type="radio"
									id="male"
									label="Male"
									name="gender"
									onChange={(ee) => {
										setCredential((prevState) => {
											return { ...prevState, gender: 'male' };
										});
									}}
									value="male"
									isInvalid={credentials.gender === '' || credentials.gender === null}
								/>
								<Form.Check
									required
									custom
									type="radio"
									id="female"
									label="Female"
									name="gender"
									onChange={(ee) => {
										setCredential((prevState) => {
											return { ...prevState, gender: 'female' };
										});
									}}
									value="female"
									isInvalid={credentials.gender === '' || credentials.gender === null}
								/>
							</Form.Group>
						</Form.Row>

						<Form.Group>
							<Form.Check
								required
								label="Agree to terms and conditions"
								feedback="You must agree before submitting."
								onChange={(e) => setTermAccept(e.target.checked)}
								isInvalid={!termAccept}
							/>
						</Form.Group>
						{/* <FullButtonField type="submit" variant="outline-primary">
									Create account!
								</FullButtonField> */}
						<AwesomeButtonProgress
							style={{ width: '100%' }}
							type="secondary"
							size="medium"
							action={(element, next) =>
								setTimeout(() => {
									//awesome_button_middleware = next;
									handleSubmit(next);
								}, 500)}
							loadingLabel="Creating Account , Please be patient . . ."
							resultLabel="👍🏽"
						>
							Register
						</AwesomeButtonProgress>
					</Form>
				</Col>
			</Row>
		</MainContainer>
	);
}

export default Register;
