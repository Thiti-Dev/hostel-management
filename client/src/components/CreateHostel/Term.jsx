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
// ────────────────────────────────────────────────────────────────────────────────
const TermAndAgreementContainer = styled.div`padding: 6rem;`;

const TermHeader = styled.p`
	font-size: 1.5rem;
	font-weight: 500;
	text-decoration: underline;
`;

const CustomListContainer = styled.ul`list-style: upper-roman;`;

const CustomList = styled.li`margin-bottom: 1rem;`;
export default function Term({ onaccept, history }) {
	return (
		<TermAndAgreementContainer>
			<TermHeader>Terms and Agreement</TermHeader>
			<CustomListContainer>
				<CustomList>All details have to be the truth</CustomList>
				<CustomList>After publishing , your hostel can be seen by all member in this website</CustomList>
				<CustomList>
					Your hostel status can be changed from not verified to verified by the staff team, after the hostel
					is checked or investigated by them
				</CustomList>
				<CustomList>
					If some of the details that you've provided are not the truth, your account will be permanently
					deleted
				</CustomList>
			</CustomListContainer>
			<AwesomeButtonProgress
				style={{ width: '100%', marginBottom: '0.5rem' }}
				type="secondary"
				size="medium"
				action={(element, next) =>
					setTimeout(() => {
						next();
						onaccept();
					}, 500)}
				loadingLabel="Creating create panel , Please be patient . . ."
				resultLabel="👍🏽"
			>
				I understand and accept the agreement
			</AwesomeButtonProgress>
			<AwesomeButton
				style={{ width: '100%', marginBottom: '0.5rem' }}
				type="reddit"
				size="medium"
				action={() => {
					history.push('/home');
				}}
				loadingLabel="Applying your changes , Please be patient . . ."
				resultLabel="👍🏽"
			>
				Take me back to home
			</AwesomeButton>
		</TermAndAgreementContainer>
	);
}
