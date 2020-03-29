import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../../redux/actions';
import axios from 'axios';
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
	Form
} from 'react-bootstrap';

import { AwesomeButton, AwesomeButtonProgress, AwesomeButtonSocial } from 'react-awesome-button';

//
// ─── STYLING ────────────────────────────────────────────────────────────────────
//
import { Animated } from 'react-animated-css';
import styled from 'styled-components';

//
// ─── VALIDATOR ──────────────────────────────────────────────────────────────────
//

import * as Func from '../../utils/Functions';

import DecodedJWT from '../../utils/DecodedJWT';

const MainBg =
	'https://images.unsplash.com/photo-1483943341979-30154bdbb4d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80';

const BackgroundAbs = styled.div`
	background-image: url(${MainBg});
	background-size: cover;
	background-repeat: no-repeat;
	background-position-y: -8rem;
	filter: blur(4px);
	height: 100%;
	width: 100%;
	left: 0;
	top: 0;
	overflow: hidden;
	position: fixed;
	z-index: -5;
`;

const FormContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
	font-family: 'Courier New', Courier, monospace;
`;

const CardForm = styled(Card)`
    padding: 2rem;
    width: 40rem;
`;

const CustomErrorFeedback = styled.p`
	color: red;
	font-size: 0.9rem;
	margin-top: 1rem;
	text-align: center;
`;

function Login(props) {
	useEffect(() => {
		document.title = '🔐 Authentication';
	}, []);

	const _authState = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	useEffect(
		() => {
			if (_authState.isAuthenticated) {
				setTimeout(() => {
					props.history.push('/home');
				}, 1500);
			}
		},
		[ _authState.isAuthenticated ]
	);
	useEffect(() => {
		document.title = '🔐 Authentication';
	}, []);

	const [ errorMsg, setErrorMsg ] = useState('');

	const [ credentials, setCredential ] = useState({
		email: '',
		password: ''
	});

	const [ notifyInvalid, setNotifyInvalid ] = useState(false);

	const formInputHandler = (event) => {
		let key = event.target.name;
		let value = event.target.value;
		setCredential((prevState) => {
			return { ...prevState, [key]: value };
		});
	};

	const formSubmit = async (next) => {
		if (credentials.email.length === 0 || credentials.password.length === 0) {
			setNotifyInvalid(true);
			return next(false, '⛔️ Invalid Credential');
		}
		try {
			const result = await axios.post('/api/auth/login', credentials);
			const { token } = result.data;
			const decoded = DecodedJWT(token);
			dispatch(allActions.authActions.setCurrentUser(decoded));
			console.log(decoded);
			next();
		} catch (err) {
			const { errors } = err.response.data; // destructuring
			setErrorMsg(errors); // set an error message
			return next(false, '⛔️ Invalid Credential');
		}
	};
	return (
		<Container fluid>
			<BackgroundAbs />
			<FormContainer>
				{/* <span style={{ fontSize: '5rem' }}>🏚</span> */}
				<CardForm>
					<span style={{ fontSize: '2rem', textAlign: 'center' }}>HOSTELOGA</span>
					<span style={{ fontSize: '5rem', textAlign: 'center', marginBottom: '2rem' }}>🏚</span>
					<Form noValidate onSubmit={(e) => e.preventDefault()}>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email / Username</Form.Label>
							<Form.Control
								type="email"
								placeholder="Email / Username"
								onChange={formInputHandler}
								name="email"
								isInvalid={notifyInvalid && credentials.email.length === 0}
								autoComplete="off"
							/>
							<Form.Control.Feedback type="invalid">Don't leave this empty</Form.Control.Feedback>
							<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								onChange={formInputHandler}
								name="password"
								isInvalid={notifyInvalid && credentials.password.length === 0}
							/>
							<Form.Control.Feedback type="invalid">Don't leave this empty</Form.Control.Feedback>
						</Form.Group>
						<Form.Group controlId="formBasicCheckbox">
							<Form.Check type="checkbox" label="Remember my credential" />
						</Form.Group>
						<AwesomeButtonProgress
							style={{ width: '100%' }}
							type="secondary"
							size="medium"
							action={(element, next) =>
								setTimeout(() => {
									//awesome_button_middleware = next;
									formSubmit(next);
								}, 500)}
							loadingLabel="Logging In , Please be patient . . ."
							resultLabel="👍🏽"
						>
							Sign In
						</AwesomeButtonProgress>
					</Form>
					<CustomErrorFeedback>{errorMsg ? errorMsg : null}</CustomErrorFeedback>
				</CardForm>
			</FormContainer>
		</Container>
	);
}

export default Login;
