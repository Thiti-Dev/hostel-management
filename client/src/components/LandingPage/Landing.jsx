import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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

import CountUp from 'react-countup';
import axios from 'axios';

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

function Landing(props) {
	const _authState = useSelector((state) => state.auth);
	const [ statisticData, setStatisticData ] = useState(null);

	useEffect(() => {
		Events.scrollEvent.register('begin', function(to, element) {
			console.log('begin', arguments);
		});

		Events.scrollEvent.register('end', function(to, element) {
			console.log('end', arguments);
		});
		scrollSpy.update();
		return () => {
			Events.scrollEvent.remove('begin');
			Events.scrollEvent.remove('end');
		};
	});

	useEffect(() => {
		if (_authState.isAuthenticated) {
			props.history.push('/home');
		}
	}, []);

	const scrollTo = (section) => {
		// Rendering dynamic calls
		scroller.scrollTo(section, {
			duration: 1500,
			delay: 0,
			smooth: 'easeInOutQuart'
		});
	};

	const fetchStatistic = async () => {
		try {
			const fetched_statistic = await axios.get('/api/services/getStatistic');
			const statistic_data = fetched_statistic.data.data;
			setStatisticData(statistic_data);
			console.log(statistic_data);
		} catch (error) {
			// This will happen when the server is not response
		}
	};

	useEffect(() => {
		document.title = '🏠 Hosteloga';
		fetchStatistic();
	}, []);

	const [ shouldStartCountUp, startCountUp ] = useState(false);

	const jumpToPage = (routeStr) => {
		props.history.push(routeStr);
	};

	const statisticOnScreen = (visible) => {
		if (visible && !shouldStartCountUp) {
			startCountUp(true);
		}
	};

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
					<ButtonInNav onClick={() => scrollTo('about')}>About</ButtonInNav>
					<ButtonInNav onClick={() => scrollTo('register')}>Sign up</ButtonInNav>
					<ButtonInNav onClick={() => jumpToPage('/login')}>Sign in</ButtonInNav>
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
			<Element name="about" className="element">
				<CustomSection>
					<span>About</span>
					<UnderlineCenter />
					<p style={{ textAlign: 'left', fontSize: '0.8rem', marginTop: '3rem' }}>
						This is the website that provides you the lists of hostel that is registered and giving the
						opportunity for you to whether booking or exploring the places around the world. You also can
						become a partner by hosting your own place and serve the best to all of the member
					</p>
				</CustomSection>
			</Element>
			<CustomSection>
				<span>Statistic</span>
				<UnderlineCenter />

				<OnScreenSensor onChange={statisticOnScreen}>
					<StatisticHolder>
						<div>
							<StatisticNumber>
								{shouldStartCountUp && statisticData ? (
									<CountUp end={statisticData.total_hostel} duration={10} />
								) : null}
							</StatisticNumber>
							<div>Total Hostel</div>
						</div>
						<div>
							<StatisticNumber>
								{shouldStartCountUp && statisticData ? (
									<CountUp end={statisticData.total_booking} duration={10} />
								) : null}
							</StatisticNumber>
							<div>Total Booked</div>
						</div>
						<div>
							<StatisticNumber>
								{shouldStartCountUp && statisticData ? (
									<CountUp end={statisticData.total_user} duration={10} />
								) : null}
							</StatisticNumber>
							<div>Account Created</div>
						</div>
					</StatisticHolder>
				</OnScreenSensor>
			</CustomSection>
			<SectionSeparator />

			<Element name="register" className="element">
				<Register history={props.history} />
			</Element>
		</Container>
	);
}

export default withRouter(Landing);
