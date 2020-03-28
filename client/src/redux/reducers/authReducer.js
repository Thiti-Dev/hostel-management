import { DUMMY_ACTION } from '../actions/types';

const initialState = {
	test: 'This is Working Just fine',
	profile: {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case DUMMY_ACTION:
			break;
		default:
			return state;
	}
}
