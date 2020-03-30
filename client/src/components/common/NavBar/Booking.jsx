import React, { Component } from 'react';
import styled from 'styled-components';
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
import { FaSearchLocation, FaRegCalendarAlt } from 'react-icons/fa';
import { IoMdPeople, IoIosInformationCircleOutline, IoIosPeople, IoIosCloudyNight } from 'react-icons/io';
import { FiMapPin } from 'react-icons/fi';
import { GiMoneyStack, GiTakeMyMoney } from 'react-icons/gi';
import { MdMoveToInbox } from 'react-icons/md';
import { FiBox } from 'react-icons/fi';
const BookingHolder = styled(Container)`
font-size: 0.8rem;
    margin-top: 2rem;
    height: 90%;
    width:90%;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar{
        width: 0.3vw;
	    padding-left: 5vw;
    }
    &::-webkit-scrollbar-track {
	    background: #f1f1f100;
	    border-radius: 10px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
	    background: grey;
	    border-radius: 10px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
	    background: #555;
    }
`;
const CustomRow = styled(Row)`
    margin-bottom: 2rem;
    flex-wrap: nowrap;
    display: flexbox; /* Fixed on hovering wrapped problem */
    cursor: pointer;
`;

const NoBookedLabel = styled.p`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 1rem;
`;

const dummyData = [
	{
		name: 'The Ayutthaya hostel',
		startDate: '21 apr 2020',
		endDate: '24 apr 2020',
		totalGuest: 5,
		photo: 'photo_5e7f6b8310b4cd56d8a815d1.jpg',
		totalPrice: 300
	},
	{
		name: 'The Angthong hostel',
		startDate: '28 apr 2020',
		endDate: '30 apr 2020',
		totalGuest: 2,
		photo: 'photo_5e80ac613cf8003f60ea5140.jpg',
		totalPrice: 500
	}
];

export default class Booking extends Component {
	render() {
		let rendered_history;
		if (dummyData.length > 0) {
			rendered_history = dummyData.map((place, key) => {
				return (
					<CustomRow className="hvr-grow">
						<Col md={4}>
							<Image src={`/uploads/${place.photo}`} width="120" height="80" rounded />
						</Col>
						<Col md={8}>
							<p>
								<FiMapPin /> {place.name}
								<br />
								<FaRegCalendarAlt /> {place.startDate} - {place.endDate}
								<br />
								<IoMdPeople /> {place.totalGuest} people
								<br />
								<GiMoneyStack /> {place.totalPrice} baht
							</p>
						</Col>
					</CustomRow>
				);
			});
		} else {
			rendered_history = <NoBookedLabel>No booking history</NoBookedLabel>;
		}
		return <BookingHolder fluid>{rendered_history}</BookingHolder>;
	}
}
