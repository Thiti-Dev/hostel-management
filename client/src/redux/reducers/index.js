import { combineReducers } from 'redux';
import authReducer from './authReducer';
import actionReducer from './actionReducer';
import bookingReducer from './bookingReducer';
export default combineReducers({
	auth: authReducer,
	action: actionReducer,
	booking: bookingReducer
});
