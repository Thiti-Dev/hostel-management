import { SET_BOOKING_HISTORY } from './types';
export const setBookingHistory = (data) => {
	return {
		type: SET_BOOKING_HISTORY,
		payload: data
	};
};
