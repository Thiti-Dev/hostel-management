import { SET_BOOKING_HISTORY, RE_FETCHING_BOOKING_HISTORY, DONE_FETCHING_BOOKING_HISTORY } from './types';

import axios from 'axios';
// Register User
export const fetchBookingHistory = () => async (dispatch) => {
	try {
		const fetched_booking = await axios.get(`/api/booking/myBooking`);
		dispatch(setBookingHistory(fetched_booking.data.data));
		dispatch({
			type: DONE_FETCHING_BOOKING_HISTORY
		});
	} catch (error) {
		console.log(error);
	}
};

export const setBookingHistory = (data) => {
	return {
		type: SET_BOOKING_HISTORY,
		payload: data
	};
};

export const reFetchBookingHistory = () => {
	return {
		type: RE_FETCHING_BOOKING_HISTORY
	};
};
