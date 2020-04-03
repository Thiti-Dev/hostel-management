import jwt_decode from 'jwt-decode';

export default (token) => {
	const decoded = jwt_decode(token); // decode the token
	return decoded; // return the decoded token back
};
