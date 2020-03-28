//
// ─── HAVE THIS SEPARATED BECAUSE I JUST WANTED TO MAKE A REALTIME VALIDATION PHASE LOOKS BEAUTIFUL BUT DONT WORRY WE STILL HAVE A SERVER SIDED VALIDATION FOR THE NXT PHASE IF SOMETHING GOES WRONG
//

import * as Func from '../../../utils/Functions';

const _isRegistrationValid = (credentials) => {
	//let _valid = true; // true at default // no need
	if (
		credentials.firstName.length < 3 ||
		credentials.lastName.length < 3 ||
		credentials.username.length < 3 ||
		!Func.validateEmail(credentials.email) ||
		credentials.password !== credentials.confirmPassword ||
		credentials.password.length === 0 ||
		credentials.confirmPassword.length === 0 ||
		(credentials.gender !== 'male' && credentials.gender !== 'female') ||
		credentials.gender === '' ||
		credentials.gender === null
	) {
		return false;
	}
	return true; // if not meet one of those above
};

export default _isRegistrationValid;
