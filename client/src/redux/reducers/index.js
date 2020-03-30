import { combineReducers } from 'redux';
import authReducer from './authReducer';
import actionReducer from './actionReducer';
export default combineReducers({
	auth: authReducer,
	action: actionReducer
});
