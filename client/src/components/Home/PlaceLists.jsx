import React from 'react';
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
	Modal
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

import { FaSearchLocation, FaRegCalendarAlt } from 'react-icons/fa';
import { IoMdPeople, IoIosInformationCircleOutline, IoIosPeople } from 'react-icons/io';
import { FiMapPin } from 'react-icons/fi';
import { TiContacts } from 'react-icons/ti';
import { AiOutlineMail } from 'react-icons/ai';
import { GiMoneyStack, GiTakeMyMoney } from 'react-icons/gi';
//
// ─── MY OWN LIB ─────────────────────────────────────────────────────────────────
//
import OnScreenSensor from 'react-onscreensensor';
// ────────────────────────────────────────────────────────────────────────────────

import SectionSeparator from '../common/SectionSeparator';

import Rating from 'react-rating';
import BookModal from './BookModal';
const mainParallax =
	'https://images.unsplash.com/photo-1527796261673-e9d61cc1e03c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80';

const SearchContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: white;
	opacity: 0.8;
	z-index: 999;
	width: 50rem;
	padding: 2rem;
	/* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
	box-shadow: 5px 5px grey;
	border-radius: 1.5rem;
`;

const CustomLocationSearchInput = styled(Form.Control)`
	height: 3.5rem;
	text-align: center;
	&:focus{
		outline: none;
		border-color: inherit;
		box-shadow: none;
	}
`;

const PlaceOuterContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center; /* For horizontal alignment */
	align-items: center; /* For vertical alignment */
	@media (max-width: 1200px) {
		display: block; /* If less than that just set to block ( no responsive design for now) */
	}
`;

const PlaceContainer = styled(Card)`
	position: relative;
	margin-top: 2rem;
	margin-bottom: 2rem;
	height: 15rem;
	width: 70rem; /* old 100% */
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	overflow: hidden;
	display: block;
`;

const PlacePhoto = styled.div`
	width: 30%;
	height: 100%;
	background-image: url(${(props) => props.photo_loc});
	background-size: cover;
	background-repeat: round;
	float: left;
	display: inline;
`;

const PlaceInfo = styled.div`
	height: 100%;
	width: 45%;
	display: inline-block;
	padding: 1.0rem 1rem 0.5rem;
	font-family: 'Courier New', Courier, monospace;
	border-right: 2px solid whitesmoke;
`;

const PlaceInfo2 = styled.div`
	position: absolute;
	width: 25%;
	height: 100%;
	padding: 1.0rem 1rem 0.5rem;
	display: inline-block;
	font-family: 'Courier New', Courier, monospace;
`;

const PlaceName = styled.p`
	font-size: 1.5rem;
	font-weight: bold;
	line-height: 30px; /* within paragraph */
	margin-bottom: 0px; /* between paragraphs */
`;

const StatusHolder = styled.p`
	font-size: 1rem;
	line-height: 50px; /* within paragraph */
	margin-bottom: 0px; /* between paragraphs */
`;
const InformationHolder = styled.p`
	font-size: 1rem;
	line-height: 25px; /* within paragraph */
	margin-bottom: 10px; /* between paragraphs */
`;

const VerifiedBadge = styled(Badge)`
	font-size: 0.8rem;
`;

const FetchedInformation = styled.h1`
	font-family: 'Courier New', Courier, monospace;
	margin-top: 3rem;
`;
export default function PlaceLists({ placeData, totalGuest }) {
	const [ modalData, setModalData ] = React.useState({});
	const [ modalShow, setModalShow ] = React.useState(false);
	const onBookProcess = (data) => {
		//console.log(placeData); // log the place data into the console
		setModalData(data);
		setModalShow(true);
	};
	console.log(placeData);
	let places = placeData.map((place, key) => {
		let redered_variant = place.validated ? 'success' : 'danger';
		let rendered_email = place.email ? (
			<React.Fragment>
				, <AiOutlineMail /> {place.email}
			</React.Fragment>
		) : null;
		return (
			<React.Fragment key={key}>
				<PlaceOuterContainer>
					<PlaceContainer>
						<PlacePhoto photo_loc={`/uploads/${place.photo}`} />
						<PlaceInfo>
							<PlaceName>{place.name}</PlaceName>
							<StatusHolder>
								status:{' '}
								<VerifiedBadge variant={redered_variant}>
									{place.validated ? 'verified' : 'not verified'}
								</VerifiedBadge>
							</StatusHolder>
							<InformationHolder>
								<FiMapPin /> {place.address}
							</InformationHolder>
							<InformationHolder>
								<IoIosInformationCircleOutline /> {place.description}
							</InformationHolder>
							<InformationHolder>
								<TiContacts /> {place.phone} {rendered_email}
							</InformationHolder>
						</PlaceInfo>
						<PlaceInfo2>
							<InformationHolder>
								{/* <IoIosPeople /> : 7 total booked <br /> */}
								<GiMoneyStack /> : {place.price} baht / night <br />
								{/* <GiTakeMyMoney /> : Total {totalGuest * place.price} baht */}
							</InformationHolder>
							<AwesomeButtonProgress
								style={{ width: '100%', marginTop: '1.8rem' }}
								type="secondary"
								size="medium"
								action={(element, next) =>
									setTimeout(() => {
										//awesome_button_middleware = next;
										next();
									}, 500)}
								loadingLabel="Getting more information . . ."
								resultLabel="👍🏽"
							>
								View more
							</AwesomeButtonProgress>
							<AwesomeButtonProgress
								style={{ width: '100%', marginTop: '0.5rem' }}
								type="primary"
								size="medium"
								action={(element, next) =>
									setTimeout(() => {
										//awesome_button_middleware = next;
										next();
										onBookProcess(place);
									}, 500)}
								loadingLabel="Booking the place . . ."
								resultLabel="👍🏽"
							>
								Book now
							</AwesomeButtonProgress>
						</PlaceInfo2>
					</PlaceContainer>
				</PlaceOuterContainer>
			</React.Fragment>
		);
	});
	let total = places.length;
	return (
		<React.Fragment>
			<BookModal place_data={modalData} show={modalShow} onHide={() => setModalShow(false)} />
			{places.length > 0 ? <FetchedInformation>Found {total} Total Hostels</FetchedInformation> : null}

			{places}
		</React.Fragment>
	);
}
