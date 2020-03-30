import { SET_BOOKING_HISTORY } from '../actions/types';
import isEmpty from '../../validation/is-empty';
const initialState = {
	bookingHistory: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_BOOKING_HISTORY:
			return {
				...state,
				bookingHistory: action.payload
			};

		default:
			return state;
	}
}
