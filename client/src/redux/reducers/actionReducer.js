import { SET_CURRENT_SEARCH_ACTION, SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../../validation/is-empty';
const initialState = {
	currentAction: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_SEARCH_ACTION:
			return {
				...state,
				currentAction: action.payload
			};

		default:
			return state;
	}
}
