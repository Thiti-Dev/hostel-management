import React, { useState, useEffect } from 'react';
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
function Login() {
	useEffect(() => {
		document.title = '🔐 Authentication';
	}, []);

	const [ credentials, setCredential ] = useState({
		email: '',
		password: ''
	});

	const formInputHandler = (event) => {
		let key = event.target.name;
		let value = event.target.value;
		setCredential((prevState) => {
			return { ...prevState, [key]: value };
		});
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
								// isInvalid={!Func.validateEmail(credentials.email) && credentials.email.length > 0}
							/>
							<Form.Control.Feedback type="invalid">Invalid email</Form.Control.Feedback>
							<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								onChange={formInputHandler}
								name="password"
							/>
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
									next();
								}, 500)}
							loadingLabel="Logging In , Please be patient . . ."
							resultLabel="👍🏽"
						>
							Sign In
						</AwesomeButtonProgress>
					</Form>
				</CardForm>
			</FormContainer>
		</Container>
	);
}

export default Login;
