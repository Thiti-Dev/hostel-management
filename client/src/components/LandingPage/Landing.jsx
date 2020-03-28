import React, { useState, useEffect } from 'react';

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
	Button
} from 'react-bootstrap';

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
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── MY OWN LIB ─────────────────────────────────────────────────────────────────
//
import OnScreenSensor from 'react-onscreensensor';
// ────────────────────────────────────────────────────────────────────────────────

import SectionSeparator from '../common/SectionSeparator';

import Register from './Register';

const TransNav = styled.div`
	width: 100%;
	height: 4rem;
	background-color: black;
	position: absolute;
	z-index: 999;
	opacity: 0.4;

	color: white;
`;

const LogoText = styled.span`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	height: 95%;
	font-family: 'Courier New', Courier, monospace;
	font-size: 2vw;
	text-shadow: 0.08vw 0.08vw 0.08vw #ffffff;
	color: rgba(255, 255, 255, 1);
	margin-left: 2vw;
`;

const MenuContainer = styled.div`
	position: absolute;
	/* background-color: greenyellow; */
	width: 35rem;
	height: 100%;
	left: 60%;
	display: flex;
	justify-content: space-evenly;
	font-family: monospace;
	align-items: center;
	font-size: 2rem;
`;

const CenterText = styled.div`
	background: white;
	padding: 1rem;
	position: absolute;
	top: 35%;
	left: 50%;
	opacity: 0.7;
	transform: translate(-50%, -50%);
	font-family: 'Courier New', Courier, monospace;
	text-shadow: 0.08vw 0.08vw 0.08vw #000000;
	color: rgba(255, 255, 255, 0.589);
	user-select: none;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const ScrollDown = styled.div`
	margin-top: 1rem;
	position: relative;
	left: 50%;
	display: block;
	text-align: center;
	font-size: 20px;
	z-index: 100;
	text-decoration: none;
	text-shadow: 0;
	width: 13px;
	height: 13px;
	border-bottom: 2px solid #fff;
	border-right: 2px solid #fff;
	z-index: 9;
	-webkit-transform: translate(-50%, 0%);
	-moz-transform: translate(-50%, 0%);
	transform: translate(-50%, 0%);
	-webkit-animation: ${fade_move_down} 2s ease-in-out infinite;
	-moz-animation: ${fade_move_down} 2s ease-in-out infinite;
	animation: ${fade_move_down} 2s ease-in-out infinite;
`;

const CustomSection = styled.div`
	padding: 50px 10vw 0px 10vw;
	text-align: center;
	font-family: 'Courier New', Courier, monospace;
	font-size: 4rem;
`;

const UnderlineCenter = styled.div`
	position: absolute;
    width: 150px;
    height: 2px;
    background: #e55d87;
    background: -moz-linear-gradient(-45deg, #e55d87 0%, #5fc3e4 100%);
    background: -webkit-linear-gradient(-45deg, #e55d87 0%, #5fc3e4 100%);
    background: linear-gradient(135deg, #e55d87 0%, #5fc3e4 100%);
    margin-bottom: 50px;
	left: 50%; /* relative to nearest positioned ancestor or body element */
	transform: translate(-50%, -50%); /* relative to element's height & width */
}
`;

const StatisticHolder = styled.div`
	margin-top: 3rem;
	width: 100%;
	height: 10rem;
	display: flex;
	justify-content: space-evenly;
	font-size: 1.2rem;
`;

const StatisticNumber = styled.div`font-size: 5rem;`;

const ButtonInNav = styled.span`
	font-size: 1.2rem;
	border-radius: 3px;
	padding: 1rem;

	:hover {
		border-color: white;
		border: solid;
	}
	transition: ease-in-out 300ms;

	text-transform: uppercase;

	cursor: pointer;
`;

const bgLanding =
	'https://images.pexels.com/photos/860562/pexels-photo-860562.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

function Landing() {
	useEffect(() => {
		document.title = '🏠 Hosteloga';
	}, []);

	const [ scrollPosition, setSrollPosition ] = useState(0);
	const handleScroll = () => {
		const position = window.pageYOffset;
		setSrollPosition(position);
		console.log(position);
	};

	// useEffect(() => {
	// 	window.addEventListener('scroll', handleScroll, { passive: true });

	// 	return () => {
	// 		window.removeEventListener('scroll', handleScroll);
	// 	};
	// }, []);
	return (
		<Container fluid style={{ margin: 0, padding: 0 }}>
			{/* <TransNav>
				<MenuContainer>
					<p>Explore</p>
					<p>Sign up</p>
					<p>Sign In</p>
				</MenuContainer>
				<LogoText>Hosteloga</LogoText>
			</TransNav>
			<Parallax bgImage={bgLanding} strength={500} blur={{ min: -5, max: 10 }} bgImageStyle={{ height: '100vh' }}>
				<div style={{ height: 500 }} />
			</Parallax> */}
			<TransNav>
				<MenuContainer>
					<ButtonInNav>About</ButtonInNav>
					<ButtonInNav>Hostels</ButtonInNav>
					<ButtonInNav>Sign up</ButtonInNav>
					<ButtonInNav>Sign in</ButtonInNav>
				</MenuContainer>
			</TransNav>
			<Parallax
				bgImage={bgLanding}
				strength={0}
				blur={{ min: -10, max: 15 }}
				bgImageStyle={{ height: '100%', width: '100%' }}
			>
				<div style={{ height: 500 }} />
				<CenterText>You've been walking too long, we have the places for you to take a rest</CenterText>
			</Parallax>
			<ScrollDown>︾</ScrollDown>
			<CustomSection>
				<span>About</span>
				<UnderlineCenter />
				<p style={{ textAlign: 'left', fontSize: '0.8rem', marginTop: '3rem' }}>
					This is the website that provides you the lists of hostel that is registered and giving the
					opportunity for you to whether booking or exploring the places around the world
				</p>
			</CustomSection>
			<CustomSection>
				<span>Statistic</span>
				<UnderlineCenter />

				<StatisticHolder>
					<div>
						<StatisticNumber>5</StatisticNumber>
						<div>Total Hostel</div>
					</div>
					<div>
						<StatisticNumber>28</StatisticNumber>
						<div>Total Booked</div>
					</div>
					<div>
						<StatisticNumber>45</StatisticNumber>
						<div>Account Created</div>
					</div>
				</StatisticHolder>
			</CustomSection>
			<SectionSeparator />

			<Register />
		</Container>
	);
}

export default Landing;
