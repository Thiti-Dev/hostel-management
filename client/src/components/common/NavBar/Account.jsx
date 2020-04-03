import React from 'react';
import styled from 'styled-components';
import user from './assets/user.png';
import edit_account from './assets/edit-account.png';
import logout from './assets/logout.png';
import { Link } from 'react-router-dom';
import allActions from '../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import cookie from 'react-cookies';
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
	cursor: pointer;
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

export default ({ gotoroute }) => {
	const _authState = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const onLogOut = () => {
		//  remove the user token and then refresh the page
		cookie.remove('token', { path: '/' });
		window.localStorage.removeItem('jwtToken');
		dispatch(allActions.authActions.setCurrentUser({}));
		//window.location.reload(false); // reloading after the cookie is removed => automatically un-authenticated and will be redirecting to the login page
		gotoroute('/login');
	};

	return (
		<List>
			<ListItem onClick={() => gotoroute(`/user/${_authState.user.username}`)}>
				<img src={user} width={24} height={24} />
				<Heading>{_authState.user.username}</Heading>
			</ListItem>
			<ListItem onClick={() => gotoroute('/profile/edit')}>
				<img src={edit_account} width={24} height={24} />
				<Heading>Edit account</Heading>
			</ListItem>
			<ListItem onClick={() => onLogOut()}>
				<img src={logout} width={24} height={24} />
				<Heading>Log Out</Heading>
			</ListItem>
		</List>
	);
};
