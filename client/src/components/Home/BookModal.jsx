import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import { FaSearchLocation, FaRegCalendarAlt } from 'react-icons/fa';
import { IoMdPeople, IoIosInformationCircleOutline, IoIosPeople, IoIosCloudyNight } from 'react-icons/io';
import { FiMapPin } from 'react-icons/fi';
import { GiMoneyStack, GiTakeMyMoney } from 'react-icons/gi';
import { AwesomeButton, AwesomeButtonProgress, AwesomeButtonSocial } from 'react-awesome-button';

import Moment from 'react-moment';
import * as Func from '../../utils/Functions';
//
// ─── STYLING ────────────────────────────────────────────────────────────────────
//
import { Animated } from 'react-animated-css';
import styled from 'styled-components';

function BookModal(props) {
	const _actionState = useSelector((state) => state.action);
	const search_data = _actionState.currentAction;
	const { _id, name, photo, validated, description, phone, address, price } = props.place_data;
	const getTotalPrice = () => {
		let total_price =
			search_data.totalGuest * price * Func.getTotalDayBetweenDate(search_data.startDate, search_data.endDate);
		return total_price;
	};

	return (
		<React.Fragment>
			<Modal
				{...props}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				style={{ fontFamily: 'Courier New' }}
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						{name} <br />{' '}
						<span style={{ fontSize: '0.9rem' }}>
							<FiMapPin /> {address}{' '}
						</span>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{/* <img src={`/uploads/${photo}`} width="300" height="250" />
					<p>{description}</p> */}
					<Container>
						<Row className="show-grid">
							<Col md={4}>
								<img src={`/uploads/${photo}`} width="100%" height="220" />
							</Col>
							<Col md={8}>
								<p>
									<IoIosInformationCircleOutline /> {description}
									<br />
									<GiMoneyStack /> : {price} baht per night
								</p>
								<br />
								<p>Confirm booking information:</p>
								<p>
									<IoMdPeople /> {search_data.totalGuest} people
									<br />
									<FaRegCalendarAlt />{' '}
									<Moment format="D MMM YYYY" withTitle>
										{search_data.startDate}
									</Moment>{' '}
									{' - '}{' '}
									<Moment format="D MMM YYYY" withTitle>
										{search_data.endDate}
									</Moment>{' '}
									, <IoIosCloudyNight />
									{'  '}
									{Func.getTotalDayBetweenDate(search_data.startDate, search_data.endDate)} night
									<br />
									<GiTakeMyMoney /> Total price: {getTotalPrice()}
								</p>
							</Col>
						</Row>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={props.onHide}>Close</Button>
				</Modal.Footer>
			</Modal>
		</React.Fragment>
	);
}

export default BookModal;
