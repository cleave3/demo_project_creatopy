import { Http } from '../../Http/Http';
import { toastr } from '../../notification/notify';
import * as userTypes from '../types/Types';


export const login = (data) => async dispatch => {
    try {
        dispatch({ type: userTypes.LOGGING_IN })
        const result = await Http.post(data);
        if (result.data) {
            dispatch({ type: userTypes.LOGIN_SUCCESS, payload: result.data.login })
        } else {
            dispatch({ type: userTypes.LOGIN_FAILED })
            result.errors.map(({ message }) => toastr.error(message))
        }
    } catch ({ message }) {
        dispatch({ type: userTypes.LOGIN_FAILED });
        toastr.error(message)
    } finally {
        dispatch({ type: userTypes.LOGIN_COMPLETED });
    }
};

export const register = (data) => async dispatch => {
    try {
        dispatch({ type: userTypes.REGISTERING })
        const result = await Http.post(data);
        console.log(result)
        if (result.data) {
            dispatch({ type: userTypes.REGISTRATION_SUCCESS, payload: result.data.register })
        } else {
            dispatch({ type: userTypes.REGISTRATION_FAILED })
            result.errors.map(({ message }) => toastr.error(message))
        }
    } catch ({ message }) {
        dispatch({ type: userTypes.REGISTRATION_FAILED });
        toastr.error(message)
    } finally {
        dispatch({ type: userTypes.REGISTRATION_COMPLETED });
    }
};

export const logout = () => dispatch => {
    dispatch({ type: userTypes.LOGOUT });
}
