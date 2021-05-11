import { Reducer } from 'redux';
import * as userTypes from "../types/Types"

const initalState: UserState = {
    auth: false,
    loading: false,
    name: '',
    token: ""
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
        case userTypes.REGISTERING:
            return {
                ...state,
                loading: true
            };
        case userTypes.REGISTRATION_COMPLETED:
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
                token: ""
            };


        default:
            return state;
    }
};

export default reducer;
