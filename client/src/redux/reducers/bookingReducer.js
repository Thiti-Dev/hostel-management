import { SET_BOOKING_HISTORY, RE_FETCHING_BOOKING_HISTORY, DONE_FETCHING_BOOKING_HISTORY } from '../actions/types';
import isEmpty from '../../validation/is-empty';
const initialState = {
	bookingHistory: {},
	needFetching: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_BOOKING_HISTORY:
			return {
				...state,
				bookingHistory: action.payload
			};

		case RE_FETCHING_BOOKING_HISTORY:
			return {
				...state,
				needFetching: true
			};

		case DONE_FETCHING_BOOKING_HISTORY:
			return {
				...state,
				needFetching: false
			};

		default:
			return state;
	}
}
