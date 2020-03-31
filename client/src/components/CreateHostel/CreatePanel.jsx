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
const MySwal = withReactContent(Swal);
const FormHolder = styled.div`padding: 3rem;`;
const RequiredText = styled.span`
	color: red;
	white-space: nowrap;
`;
export default function CreatePanel({ history }) {
	const [ previewImg, setPreviewImg ] = useState(
		'https://q-cf.bstatic.com/images/hotel/max1024x768/204/204628111.jpg'
	);
	const [ hostelDetails, setHostelDetails ] = useState({
		photo: undefined,
		name: '',
		description: '',
		address: '',
		price: 500,
		capacity: 5,
		phone: '',
		email: ''
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

	const checkIfRequiredDataAreAllFilled = () => {
		const requiredField = [ 'name', 'price', 'description', 'capacity', 'address' ];

		if (hostelDetails.photo === undefined) return false; // if the photo is not selected return immediately

		let shallProceed = true; // by default
		for (let x of requiredField) {
			if (hostelDetails[x].length === 0) {
				shallProceed = false;
				break;
			}
		}
		return shallProceed;
	};

	const onPublishClicked = async (next) => {
		if (checkIfRequiredDataAreAllFilled()) {
			next();
			console.log(hostelDetails);

			// Generate hostelDetail into formdata [ Will be using array map later => for now use this instead ]
			let formData = new FormData();
			formData.append('file', hostelDetails.photo);
			formData.append('name', hostelDetails.name);
			formData.append('price', hostelDetails.price);
			formData.append('description', hostelDetails.description);
			formData.append('capacity', hostelDetails.capacity);
			formData.append('price', hostelDetails.price);
			formData.append('address', hostelDetails.address);
			formData.append('phone', hostelDetails.phone);
			formData.append('email', hostelDetails.email);
			// ─────────────────────────────────────────────────────────────────
			try {
				const published_request = await axios.post('/api/hostels/', formData);
				console.log(published_request);
				MySwal.fire({
					position: 'center',
					icon: 'success',
					title: 'Successfully published hostel',
					showConfirmButton: false,
					timer: 2000
				});
			} catch (error) {
				MySwal.fire({
					position: 'center',
					icon: 'error',
					title: 'Server Error',
					text: 'Try creating hostel later . . .',
					showConfirmButton: false,
					timer: 2000
				});
				next(false, 'Invalid Credential');
			}
		} else {
			MySwal.fire({
				position: 'center',
				icon: 'error',
				title: 'Please fill all required field',
				text: 'The information are needed for publishing hostel',
				showConfirmButton: false,
				timer: 2000
			});
			next(false, 'Invalid Credential');
		}
	};

	const formInputHandler = (event) => {
		let key = event.target.name;
		let value = event.target.value;

		setHostelDetails((prevState) => {
			return { ...prevState, [key]: value };
		});
	};
	return (
		<FormHolder>
			<Row style={{ marginBottom: '2rem' }}>
				<Col md={3}>
					<Image style={{ textAlign: 'center' }} src={previewImg} width="150" height="110" />
				</Col>
				<Col md={9}>
					<Form.Group as={Row} controlId="formHorizontalHostelName">
						<Form.Label column md={4}>
							<RequiredText>* </RequiredText>Hostel Name
						</Form.Label>
						<Col md={8}>
							<Form.Control
								type="text"
								placeholder="Name of the hostel"
								name="name"
								onChange={formInputHandler}
								value={hostelDetails.name}
								autoComplete="off"
							/>
						</Col>
					</Form.Group>
					<Form.Group as={Row} controlId="formHorizontalHostelPrice">
						<Form.Label column md={4}>
							<RequiredText>* </RequiredText>Hostel Photo
						</Form.Label>
						<Col md={8}>
							<Form.File
								onChange={onImageChange}
								id="custom-file"
								label={!hostelDetails.photo ? 'Select hostel photo' : hostelDetails.photo.name}
								custom
							/>
						</Col>
					</Form.Group>
				</Col>
			</Row>

			<Form noValidate onSubmit={(e) => e.preventDefault()}>
				<Form.Group as={Row} controlId="formHorizontalDescription">
					<Form.Label column md={3}>
						<RequiredText>* </RequiredText>Description
					</Form.Label>
					<Col md={9}>
						<Form.Control
							as="textarea"
							rows="4"
							type="text"
							placeholder="Description of the hostel, services, what is included"
							name="description"
							onChange={formInputHandler}
							value={hostelDetails.description}
						/>
					</Col>
				</Form.Group>

				<Form.Group as={Row} controlId="formHorizontalAddress">
					<Form.Label column md={3}>
						<RequiredText>* </RequiredText>Address
					</Form.Label>
					<Col md={9}>
						<Form.Control
							as="textarea"
							rows="2"
							type="text"
							placeholder="Where is the hostel located at?"
							name="address"
							onChange={formInputHandler}
							value={hostelDetails.address}
						/>
					</Col>
				</Form.Group>

				<Form.Group as={Row} controlId="formHorizontalHostelCapacity">
					<Form.Label column md={3}>
						<RequiredText>* </RequiredText>Capacity
					</Form.Label>
					<Col md={4}>
						<Form.Control
							style={{ textAlign: 'center' }}
							type="number"
							placeholder="no. people"
							name="capacity"
							onChange={formInputHandler}
							value={hostelDetails.capacity}
						/>
					</Col>
					<Form.Label column md={3}>
						people
					</Form.Label>
				</Form.Group>

				<Form.Group as={Row} controlId="formHorizontalHostelPrice">
					<Form.Label column md={3}>
						<RequiredText>* </RequiredText>Price
					</Form.Label>
					<Col md={4}>
						<Form.Control
							style={{ textAlign: 'center' }}
							type="number"
							placeholder="Per night"
							name="price"
							onChange={formInputHandler}
							value={hostelDetails.price}
						/>
					</Col>
					<Form.Label column md={3}>
						Baht
					</Form.Label>
				</Form.Group>

				<Form.Group as={Row} controlId="formHorizontalHostelPhone">
					<Form.Label column md={3}>
						Phone Call
					</Form.Label>
					<Col md={6}>
						<Form.Control
							type="number"
							placeholder="Phone number"
							name="phone"
							onChange={formInputHandler}
							value={hostelDetails.phone}
							autoComplete="off"
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row} controlId="formHorizontalHostelEmail">
					<Form.Label column md={3}>
						Email Address
					</Form.Label>
					<Col md={6}>
						<Form.Control
							type="email"
							placeholder="Your email"
							name="email"
							onChange={formInputHandler}
							value={hostelDetails.email}
							autoComplete="off"
						/>
					</Col>
				</Form.Group>

				<AwesomeButtonProgress
					style={{ width: '100%', marginTop: '0.5rem' }}
					type="secondary"
					size="medium"
					action={(element, next) =>
						setTimeout(() => {
							onPublishClicked(next);
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
