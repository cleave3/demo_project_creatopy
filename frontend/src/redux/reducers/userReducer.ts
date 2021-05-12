import { Reducer } from 'redux';
import * as userTypes from "../types/Types"

const initalState: UserState = {
    auth: false,
    loading: false,
    name: '',
    token: "",
    message: ""
};

const reducer: Reducer<UserState> = (state = initalState, action) => {
    switch (action.type) {
        case userTypes.LOGIN_SUCCESS:
            return {
                ...state,
                auth: true,
                loading: false,
                name: action.payload.name,
                token: action.payload.token
            };
        case userTypes.LOGGING_IN:
            return {
                ...state,
                loading: true
            };
        case userTypes.LOGIN_COMPLETED:
            return {
                ...state,
                loading: false
            };
        case userTypes.LOGIN_FAILED:
            return {
                ...state,
                auth: false,
                loading: false
            };
        case userTypes.REGISTRATION_SUCCESS:
            return {
                ...state,
                auth: true,
                loading: false,
                name: action.payload.name,
                token: action.payload.token
            };
        case userTypes.FORGOTPASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payload.token,
                message: action.payload.message
            };
        case userTypes.RESETPASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                token: "",
                message: action.payload.message
            };
        case userTypes.REGISTERING:
        case userTypes.INITIATE_FORGOTPASSWORD:
        case userTypes.INITIATE_RESETPASSWORD:
            return {
                ...state,
                loading: true
            };
        case userTypes.REGISTRATION_COMPLETED:
        case userTypes.FORGOTPASSWPRD_COMPLETED:
        case userTypes.FORGOTPASSWORD_FAILED:
        case userTypes.RESETPASSWORD_FAILED:
        case userTypes.RESETPASSWPRD_COMPLETED:
            return {
                ...state,
                loading: false
            };
        case userTypes.REGISTRATION_FAILED:
            return {
                ...state,
                auth: false,
                loading: false
            };
        case userTypes.LOGOUT:
            return {
                ...state,
                auth: false,
                name: "",
                token: "",
                message: ""
            };


        default:
            return state;
    }
};

export default reducer;
