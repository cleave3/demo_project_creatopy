import { useHistory } from 'react-router';
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

export const forgotPassword = (data) => async dispatch => {
    try {
        dispatch({ type: userTypes.INITIATE_FORGOTPASSWORD })
        const result = await Http.post(data);
        if (result.data) {
            dispatch({ type: userTypes.FORGOTPASSWORD_SUCCESS, payload: result.data.forgotPassword })
        } else {
            dispatch({ type: userTypes.FORGOTPASSWORD_FAILED })
            result.errors.map(({ message }) => toastr.error(message))
        }
    } catch ({ message }) {
        dispatch({ type: userTypes.FORGOTPASSWORD_FAILED });
        toastr.error(message)
    } finally {
        dispatch({ type: userTypes.FORGOTPASSWPRD_COMPLETED });
    }
};

export const resetPassword = (data, token: string) => async dispatch => {
    try {
        dispatch({ type: userTypes.INITIATE_RESETPASSWORD })
        const result = await Http.post(data, token);
        if (result.data) {
            dispatch({ type: userTypes.RESETPASSWORD_SUCCESS, payload: result.data.resetPassword })
            toastr.success("Password reset sucessful")
        } else {
            dispatch({ type: userTypes.RESETPASSWORD_FAILED })
            result.errors.map(({ message }) => toastr.error(message))
        }
    } catch ({ message }) {
        dispatch({ type: userTypes.RESETPASSWORD_FAILED });
        toastr.error(message)
    } finally {
        dispatch({ type: userTypes.FORGOTPASSWPRD_COMPLETED });
    }
};

export const logout = () => dispatch => {
    dispatch({ type: userTypes.LOGOUT });
}
