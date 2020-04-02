import React, { Component } from 'react';
import styled from 'styled-components';
import { Image } from 'react-bootstrap';

import CatZ from './img/Cat_Z.png';

import { Animated } from 'react-animated-css';
import { AwesomeButton, AwesomeButtonProgress, AwesomeButtonSocial } from 'react-awesome-button';
const Outside = styled.div`
	width: 100vw;
	height: 100vh;
	display: table;
`;

const Inside = styled.div`
	width: 50%;
	height: 50%;
	display: table-cell;
	vertical-align: middle;
	text-align: center;
`;

const Notice = styled.div`
	font-family: 'Courier New', Courier, monospace;
	font-size: 6rem;
	font-weight: 500;
	@media (max-width: 1025px) {
		font-family: "Mandali", sans-serif;
		font-size: 6rem;
		font-weight: 500;
	}
	@media (max-width: 769px) {
		font-family: "Mandali", sans-serif;
		font-size: 6rem;
		font-weight: 500;
	}
	@media (max-width: 426px) {
		font-family: "Mandali", sans-serif;
		font-size: 3.5rem;
		font-weight: 500;
	}
	@media (max-width: 376px) {
		font-family: "Mandali", sans-serif;
		font-size: 3.5rem;
		font-weight: 500;
	}
	@media (max-width: 320px) {
		font-family: "Mandali", sans-serif;
		font-size: 3rem;
		font-weight: 500;
	}
`;

class PageNotFound extends Component {
	render() {
		return (
			<React.Fragment>
				<Animated
					animationIn="flash"
					animationOut="zoomOutDown"
					animationInDuration={3000}
					animationOutDuration={3000}
					isVisible={true}
				>
					<Outside>
						<Inside>
							<Notice>404</Notice>
							<Notice>Not found</Notice>
							<AwesomeButton
								style={{ width: '20%', marginTop: '0.5rem' }}
								type="secondary"
								size="medium"
								action={() => {
									this.props.history.push('/home');
								}}
								loadingLabel="Applying your changes , Please be patient . . ."
								resultLabel="👍🏽"
							>
								Homepage
							</AwesomeButton>
							<Image src={CatZ} />
						</Inside>
					</Outside>
				</Animated>
			</React.Fragment>
		);
	}
}

export default PageNotFound;
