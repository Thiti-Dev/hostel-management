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
	Navbar,
	Nav
} from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import { AwesomeButton, AwesomeButtonProgress, AwesomeButtonSocial } from 'react-awesome-button';
import Moment from 'react-moment';
//
// ─── STYLING ────────────────────────────────────────────────────────────────────
//
import { Animated } from 'react-animated-css';
import styled from 'styled-components';
import { fade_move_down } from '../../styles/Keyframe';
// ────────────────────────────────────────────────────────────────────────────────
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { FaSearchLocation, FaRegCalendarAlt } from 'react-icons/fa';
import { IoMdPeople, IoIosInformationCircleOutline, IoIosPeople, IoIosCloudyNight } from 'react-icons/io';
import { FiMapPin } from 'react-icons/fi';
import { GiMoneyStack, GiTakeMyMoney } from 'react-icons/gi';
import { MdMoveToInbox } from 'react-icons/md';
import { FiBox } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';

import * as Func from '../../utils/Functions';

const MySwal = withReactContent(Swal);

const ListLabel = styled.p`
	font-family: 'Courier New', Courier, monospace;
	font-size: 1.3rem;
`;

const PublishedHolderContainer = styled.div`
	margin-top: 2rem;
	font-family: 'Courier New', Courier, monospace;
	height: 75vh;
	width: 60vw;
	overflow-y: auto;
	overflow-x: hidden;

	&::-webkit-scrollbar {
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

const PublishedHostelName = styled.p`font-weight: bold;`;

const CustomPublishedCard = styled(Card)`
    width: 25rem;
    display: inline-block;
    margin-left: 3rem;
    margin-top: 2rem;
`;

export default class Published extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		if (this.props.published_history) {
			console.log(this.props.published_history);
		}
	}

	render() {
		const { published_history } = this.props;
		let rendered_published_history;
		if (!published_history) {
			rendered_published_history = (
				<Spinner style={{ textAlign: 'center' }} animation="border" variant="secondary" />
			);
		} else {
			rendered_published_history = published_history.map((hostel, key) => {
				return (
					<React.Fragment key={key}>
						<CustomPublishedCard>
							<Card.Img
								style={{ width: '100%', height: '220px' }}
								variant="top"
								src={`/uploads/${hostel.photo}`}
							/>
							<Card.Body>
								<Card.Title>
									<PublishedHostelName>{hostel.name}</PublishedHostelName>
								</Card.Title>
								<Card.Text>{hostel.description}</Card.Text>
							</Card.Body>
							<Card.Footer>
								<small className="text-muted">
									Published at{' '}
									<Moment format="D MMMM YYYY" withTitle>
										{hostel.createdAt}
									</Moment>
								</small>
							</Card.Footer>
						</CustomPublishedCard>
					</React.Fragment>
				);
			});
		}
		return (
			<React.Fragment>
				<ListLabel>
					{rendered_published_history.length > 0 ? (
						<p>Total {published_history.length} hostel published by this user</p>
					) : (
						<p>This user hasn't published any hostel</p>
					)}
				</ListLabel>

				<PublishedHolderContainer>{rendered_published_history}</PublishedHolderContainer>
			</React.Fragment>
		);
	}
}
