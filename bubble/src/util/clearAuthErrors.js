import { SET_AUTH_ERRORS } from '../actions/types';

const clearAuthErrors = (dispatch) => {
    return {
        type: SET_AUTH_ERRORS,
        payload: { }
    };
}

export default clearAuthErrors;