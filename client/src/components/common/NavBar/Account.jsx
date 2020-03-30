import React from 'react';
import styled from 'styled-components';
import user from './assets/user.png';
import edit_account from './assets/edit-account.png';
import logout from './assets/logout.png';
const List = styled.ul`
	display: flex;
	flex-direction: column;
	margin-top: 10px;
	margin-left: 0px;
`;
const ListItem = styled.li`
	display: flex;
	flex-direction: row;
	margin-top: 20px;
	align-items: center;
`;
const Heading = styled.div`
	margin: 0;
	color: #6772e5;
	font-size: 16px;
	line-height: 22px;
	font-weight: 600;
	letter-spacing: .025em;
	margin-left: 10px;
	/* flex-wrap: nowrap; */
`;
const StyledLink = styled.a`
	display: flex;
	align-items: center;
	&:hover {
		opacity: 0.7;
	}
`;

export default () => {
	return (
		<List>
			<ListItem>
				<img src={user} width={24} height={24} />
				<Heading>aaw0kenn</Heading>
			</ListItem>
			<ListItem>
				<img src={edit_account} width={24} height={24} />
				<Heading>Edit account</Heading>
			</ListItem>
			<ListItem>
				<img src={logout} width={24} height={24} />
				<Heading>Log Out</Heading>
			</ListItem>
		</List>
	);
};
