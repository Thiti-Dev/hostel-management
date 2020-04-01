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
	render() {
		let { comment_text } = this.state;
		return (
			<React.Fragment>
				<HistoryHolderContainer>
					<CommentRow>
						<Col md={1}>
							<Image
								src="https://axneveshteh.ir/wp-content/uploads/2020/01/%D8%B9%DA%A9%D8%B3-%D9%BE%D8%B1%D9%88%D9%81%D8%A7%DB%8C%D9%84-%D9%87%D9%86%D8%B1%DB%8C-%D8%AF%D8%AE%D8%AA%D8%B1%D9%88%D9%86%D9%87-%D8%A7%DB%8C%D9%86%D8%B3%D8%AA%D8%A7%DA%AF%D8%B1%D8%A7%D9%85-29.jpg"
								height="80"
								width="80"
								align="middle"
							/>
						</Col>
						<Col md={{ span: 10, offset: 1 }} style={{ marginLeft: '1rem' }}>
							<CustomUserNameText>
								<span style={{ fontWeight: 'bolder' }}>@aaw0kenn</span>
								<span style={{ fontWeight: 'lighter' }}>{'   '}6 minutes ago</span>
							</CustomUserNameText>
							A good place to go with friend!
						</Col>
					</CommentRow>
					<CommentRow>
						<Col md={1}>
							<Image
								src="https://axneveshteh.ir/wp-content/uploads/2020/01/%D8%B9%DA%A9%D8%B3-%D9%BE%D8%B1%D9%88%D9%81%D8%A7%DB%8C%D9%84-%D9%87%D9%86%D8%B1%DB%8C-%D8%AF%D8%AE%D8%AA%D8%B1%D9%88%D9%86%D9%87-%D8%A7%DB%8C%D9%86%D8%B3%D8%AA%D8%A7%DA%AF%D8%B1%D8%A7%D9%85-29.jpg"
								height="80"
								width="80"
								align="middle"
							/>
						</Col>
						<Col md={{ span: 10, offset: 1 }} style={{ marginLeft: '1rem' }}>
							<CustomUserNameText>@aaw0kenn</CustomUserNameText>
							A good place to go with friend!
						</Col>
					</CommentRow>
				</HistoryHolderContainer>
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
							next();
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
