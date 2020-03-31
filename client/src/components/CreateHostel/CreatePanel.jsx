import React, { Component, useState, useEffect } from 'react';
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

const FormHolder = styled.div`padding: 3rem;`;
export default function CreatePanel({ history }) {
	const [ previewImg, setPreviewImg ] = useState(
		'https://q-cf.bstatic.com/images/hotel/max1024x768/204/204628111.jpg'
	);
	const [ hostelDetails, setHostelDetails ] = useState({
		photo: undefined
	});
	const onImageChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			setPreviewImg(URL.createObjectURL(event.target.files[0]));
			let photo_file = event.target.files[0];
			console.log(photo_file);
			setHostelDetails((prevState) => {
				return { ...prevState, photo: photo_file };
			});
		}
	};
	return (
		<FormHolder>
			<Row style={{ textAlign: 'center', marginBottom: '2rem' }}>
				<Col md={12}>
					<Image style={{ textAlign: 'center' }} src={previewImg} width="150" height="110" />
				</Col>
			</Row>

			<Form>
				<Form.Group as={Row} controlId="formHorizontalHostelPrice">
					<Form.Label column md={3}>
						Hostel Photo
					</Form.Label>
					<Col md={9}>
						<Form.File
							onChange={onImageChange}
							id="custom-file"
							label={!hostelDetails.photo ? 'Select hostel photo' : hostelDetails.photo.name}
							custom
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row} controlId="formHorizontalHostelName">
					<Form.Label column md={3}>
						Hostel Name
					</Form.Label>
					<Col md={9}>
						<Form.Control type="text" placeholder="Name of the hostel" />
					</Col>
				</Form.Group>

				<Form.Group as={Row} controlId="formHorizontalDescription">
					<Form.Label column md={3}>
						Description
					</Form.Label>
					<Col md={9}>
						<Form.Control
							as="textarea"
							rows="4"
							type="text"
							placeholder="Description of the hostel, services, what is included"
						/>
					</Col>
				</Form.Group>

				<Form.Group as={Row} controlId="formHorizontalAddress">
					<Form.Label column md={3}>
						Address
					</Form.Label>
					<Col md={9}>
						<Form.Control
							as="textarea"
							rows="2"
							type="text"
							placeholder="Where is the hostel located at?"
						/>
					</Col>
				</Form.Group>

				<Form.Group as={Row} controlId="formHorizontalHostelCapacity">
					<Form.Label column md={3}>
						Capacity
					</Form.Label>
					<Col md={4}>
						<Form.Control style={{ textAlign: 'center' }} type="number" placeholder="no. people" />
					</Col>
					<Form.Label column md={3}>
						people
					</Form.Label>
				</Form.Group>

				<Form.Group as={Row} controlId="formHorizontalHostelPrice">
					<Form.Label column md={3}>
						Price / Night
					</Form.Label>
					<Col md={4}>
						<Form.Control style={{ textAlign: 'center' }} type="number" placeholder="How much?" />
					</Col>
					<Form.Label column md={3}>
						Baht
					</Form.Label>
				</Form.Group>

				<AwesomeButtonProgress
					style={{ width: '100%', marginTop: '0.5rem' }}
					type="secondary"
					size="medium"
					action={(element, next) =>
						setTimeout(() => {
							next();
						}, 500)}
					loadingLabel="Creating create panel , Please be patient . . ."
					resultLabel="👍🏽"
				>
					Publish hostel
				</AwesomeButtonProgress>
				<AwesomeButton
					style={{ width: '100%', marginTop: '0.5rem' }}
					type="reddit"
					size="medium"
					action={() => {
						history.push('/home');
					}}
					loadingLabel="Applying your changes , Please be patient . . ."
					resultLabel="👍🏽"
				>
					Take me back to home
				</AwesomeButton>
			</Form>
		</FormHolder>
	);
}
