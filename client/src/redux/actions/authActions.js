import { SET_CURRENT_USER } from './types';
import jwt_decode from 'jwt-decode';
// Set logged in user
export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};
