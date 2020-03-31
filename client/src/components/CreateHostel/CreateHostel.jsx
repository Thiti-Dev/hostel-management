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
import { fade_move_down } from '../../styles/Keyframe';
// ────────────────────────────────────────────────────────────────────────────────
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Term from './Term';
import CreatePanel from './CreatePanel';

const MySwal = withReactContent(Swal);

const MainContainer = styled(Container)`
    margin : 0;
    padding: 0;
    overflow: hidden;
    font-family: 'Courier New', Courier, monospace;
`;

const MainPhoto = styled.div`
	width: 100%;
	height: 100vh;
	background-image: url('https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`;
export default class CreateHostel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isReady: false,
			shouldDeleteTerm: false
		};
	}
	setReady() {
		// Programmatically smoothing
		this.setState({ isReady: true });
		setTimeout(() => {
			this.setState({ shouldDeleteTerm: true });
		}, 800);
	}
	render() {
		const { isReady, shouldDeleteTerm } = this.state;
		return (
			<MainContainer fluid>
				<Row>
					<Col md={6}>
						<MainPhoto />
					</Col>
					<Col md={6}>
						{!shouldDeleteTerm ? (
							<Animated
								animationIn="slideInRight"
								animationOut="slideOutRight"
								animationOutDuration={800}
								isVisible={!isReady}
							>
								<Term history={this.props.history} onaccept={this.setReady.bind(this)} />
							</Animated>
						) : null}
						{isReady && shouldDeleteTerm ? (
							<Animated
								animationIn="slideInRight"
								animationOutDuration={0}
								isVisible={isReady && shouldDeleteTerm}
							>
								<CreatePanel history={this.props.history} />
							</Animated>
						) : null}
					</Col>
				</Row>
			</MainContainer>
		);
	}
}
