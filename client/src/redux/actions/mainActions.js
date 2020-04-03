import { SET_CURRENT_SEARCH_ACTION } from './types';
export const setCurrentSearchData = (data) => {
	return {
		type: SET_CURRENT_SEARCH_ACTION,
		payload: data
	};
};
