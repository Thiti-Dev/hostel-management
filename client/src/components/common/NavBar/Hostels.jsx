import React from 'react';
import styled from 'styled-components';
import add from './assets/add.png';
import payment from './assets/payment.png';
import partner from './assets/partner.png';
import myplace from './assets/checklist.png';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
	const _authState = useSelector((state) => state.auth);
	return (
		<ListContainer>
			<List>
				<li>
					<ListItemContent>
						<img src={partner} width={48} height={48} />
						<LisItemHeadingText>
							<ListItemHeading>HOW TO BECOME A PARTNER</ListItemHeading>
							<div>FAQ, on how to become part of us.</div>
						</LisItemHeadingText>
					</ListItemContent>
				</li>
				<li>
					<ListItemContent>
						<img src={add} width={48} height={48} />
						<LisItemHeadingText>
							<ListItemHeading>HOST A PLACE</ListItemHeading>
							<div>Add your own place, and profit with us.</div>
						</LisItemHeadingText>
					</ListItemContent>
				</li>
				<li>
					<Link to={`/user/${_authState.user.username}?action=published`}>
						<ListItemContent>
							<img src={myplace} width={48} height={48} />
							<LisItemHeadingText>
								<ListItemHeading>MY HOSTELS</ListItemHeading>
								<div>See the lists of your hostel.</div>
							</LisItemHeadingText>
						</ListItemContent>
					</Link>
				</li>
			</List>
		</ListContainer>
	);
};
