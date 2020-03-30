import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import { MdMoveToInbox } from 'react-icons/md';
import { FiBox } from 'react-icons/fi';
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
	const { _id, name, photo, validated, description, phone, address, price, capacity } = props.place_data;
	const getTotalPrice = () => {
		let total_price =
			search_data.totalGuest * price * Func.getTotalDayBetweenDate(search_data.startDate, search_data.endDate);
		return total_price;
	};
	const [ isFetching, setFetching ] = useState(false);
	const [ capacityData, setCapacityData ] = useState({});
	useEffect(
		() => {
			if (props.show) {
				setFetching(true);
				setTimeout(() => {
					setFetching(false);
					axios
						.get(
							`/api/hostels/${_id}/getCapacity?start_date=${search_data.startDate}&end_date=${search_data.endDate}&total_guest=${search_data.totalGuest}`
						)
						.then((res) => {
							const { data } = res.data;
							console.log(data);
							setCapacityData({
								totalCapacity: capacity,
								totalRemain: capacity - data.totalBooked, // capacity - booked = remain
								totalBooked: data.totalBooked,
								canProceed: data.canProceed,
								isOverload: data.isOverload
							});
						})
						.catch((err) => {
							console.log(err);
						});
				}, 3000);
				// When the prop is shown fetch the data
			} else {
				setFetching(false);
			}
		},
		[ props.show ]
	);

	let fetched_capacity = isFetching ? (
		<Spinner animation="border" variant="info" />
	) : (
		<React.Fragment>
			<IoIosPeople />{' '}
			{capacityData.totalBooked === 0 ? (
				`No one booked in this period of time`
			) : (
				`${capacityData.totalBooked} Total people booked at this period of time`
			)}{' '}
			<br />
			<MdMoveToInbox /> Capacity Remain : {capacityData.totalRemain}
		</React.Fragment>
	);

	let rendered_button =
		capacityData.totalRemain >= search_data.totalGuest ? (
			<Button variant="success" onClick={props.onHide}>
				Book the place
			</Button>
		) : (
			<Button variant="warning" onClick={props.onHide} disabled>
				Sorry, there is no space for you . . .
			</Button>
		);

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

								<p style={{ textAlign: 'center' }}>
									<br />
									<br />
									<FiBox /> Total Capacity : {capacity} <br />
								</p>
							</Col>
							<Col md={8}>
								<p>
									<IoIosInformationCircleOutline /> {description}
									<br />
									<GiMoneyStack /> : {price} baht per night
								</p>
								<br />
								<p>
									Confirm booking information: <br />
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
								<p>
									{' '}
									Hostel Capacity: <br />
									{fetched_capacity}
								</p>
							</Col>
						</Row>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" onClick={props.onHide}>
						Close
					</Button>
					{isFetching ? (
						<Button variant="primary" disabled>
							<Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
							Checking a hostel for any free space
						</Button>
					) : (
						rendered_button
					)}
				</Modal.Footer>
			</Modal>
		</React.Fragment>
	);
}

export default BookModal;
