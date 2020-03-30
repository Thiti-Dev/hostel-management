import React from 'react';
import styled from 'styled-components';
import verify from './assets/verify.png';
import { Link } from 'react-router-dom';
const ListContainer = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	justify-content: center;
	margin-left: -25px;
`;
const List = styled.ul`
	color: lightslategray;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
`;
const ListItemContent = styled.div`
	font-family: Helvetica, sans-serif;
	display: flex;
	flex-direction: row;
	&:hover {
		opacity: 0.7;
	}
`;
const LisItemHeadingText = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	font-size: 15px;
	margin-left: 10px;
`;
const ListItemHeading = styled.div`
	margin: 0;
	color: #6772e5;
	font-size: 16px;
	line-height: 22px;
	font-weight: 600;
	letter-spacing: .025em;
`;

export default () => {
	return (
		<ListContainer>
			<List>
				<li>
					<ListItemContent>
						<img src={verify} width={48} height={48} />
						<LisItemHeadingText>
							<ListItemHeading>Verify</ListItemHeading>
							<div>See the un-verified place, and verify it!.</div>
						</LisItemHeadingText>
					</ListItemContent>
				</li>
			</List>
		</ListContainer>
	);
};
