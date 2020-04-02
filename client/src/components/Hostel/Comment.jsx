import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
import { MdMoveToInbox, MdUpdate } from 'react-icons/md';
import { FiBox, FiPhone } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';
import { AiOutlineMail } from 'react-icons/ai';
import queryString from 'query-string';

const MySwal = withReactContent(Swal);
const HistoryHolderContainer = styled.div`
	margin-top: 2rem;
	font-family: 'Courier New', Courier, monospace;
	height: 55vh;
	width: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	/* background-color: grey; */

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

const CustomUserNameText = styled.p`font-size: 0.9rem;`;

const CustomCommentGuide = styled.p`
	font-size: 1rem;
	margin-top: 1rem;
`;

const CommentRow = styled(Row)`
    margin-bottom: 2rem;
`;

export default class Comment extends Component {
	constructor(props) {
		super(props);
		this.inputHandler = this.inputHandler.bind(this);
		this.state = {
			comment_text: ''
		};
	}
	inputHandler(event) {
		let key = event.target.name;
		let value = event.target.value;
		this.setState({ [key]: value });
	}
	async onCommentHandler(next) {
		const { comment_text } = this.state;
		const { hostelId, on_success } = this.props;
		if (comment_text.length > 0) {
			try {
				const comment = await axios.post(`/api/hostels/${hostelId}/comments`, { message: comment_text });

				this.setState({ comment_text: '' }); // empty the comment text
				next();
				on_success(comment_text); // calling a callback to shift the message to an array
			} catch (error) {}
		} else {
			next(false, 'No message provided');
		}
	}

	render() {
		let { comment_text } = this.state;
		const { comments_data } = this.props;
		let rendered_comments;

		if (!comments_data) {
			rendered_comments = <Spinner style={{ textAlign: 'center' }} animation="border" variant="secondary" />;
		} else {
			rendered_comments = comments_data.map((comment, key) => {
				return (
					<React.Fragment key={key}>
						<CommentRow>
							<Col md={1}>
								<Image src={`/uploads/${comment.user.photo}`} height="80" width="80" align="middle" />
							</Col>
							<Col md={{ span: 10, offset: 1 }} style={{ marginLeft: '1rem' }}>
								<CustomUserNameText>
									<Link style={{ color: 'black' }} to={`/user/${comment.user.username}`}>
										<span style={{ fontWeight: 'bolder' }}>@{comment.user.username}</span>
									</Link>
									<span style={{ fontWeight: 'lighter' }}>
										{'   '}
										<Moment fromNow>{comment.createdAt}</Moment>
									</span>
								</CustomUserNameText>
								{comment.message}
							</Col>
						</CommentRow>
					</React.Fragment>
				);
			});
		}
		return (
			<React.Fragment>
				<HistoryHolderContainer>{rendered_comments}</HistoryHolderContainer>
				<CustomCommentGuide>Add your comment</CustomCommentGuide>
				<Form.Control
					name="comment_text"
					as="textarea"
					rows="2"
					onChange={this.inputHandler}
					value={comment_text}
				/>
				<AwesomeButtonProgress
					style={{ width: '100%', marginTop: '0.6rem' }}
					type="secondary"
					size="medium"
					action={(element, next) =>
						setTimeout(() => {
							//awesome_button_middleware = next;
							this.onCommentHandler(next);
						}, 500)}
					loadingLabel="Commenting . . ."
					resultLabel="👍🏽"
				>
					Comment
				</AwesomeButtonProgress>
			</React.Fragment>
		);
	}
}
