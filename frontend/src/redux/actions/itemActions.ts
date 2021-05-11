import { Http } from '../../Http/Http';
import { toastr } from '../../notification/notify';
import * as itemTypes from '../types/Types';


export const getItems = (data, token: string) => async dispatch => {
    try {
        dispatch({ type: itemTypes.FETCHING_ITEMS })
        const result = await Http.post(data, token);
        if (result.data) {
            dispatch({ type: itemTypes.FETCH_SUCCESS, payload: result.data.items })
        } else {
            dispatch({ type: itemTypes.FETCHING_FAILED })
            result.errors.map(({ message }) => toastr.error(message))
        }
    } catch ({ message }) {
        dispatch({ type: itemTypes.FETCHING_FAILED });
        toastr.error(message)
    } finally {
        dispatch({ type: itemTypes.FETCHING_COMPLETED });
    }
};

export const addItem = (data, token: string) => async dispatch => {
    try {
        dispatch({ type: itemTypes.ADDING_ITEM })
        const result = await Http.post(data, token);
        if (result.data) {
            dispatch({ type: itemTypes.ITEM_ADDED, payload: result.data.addItem })
        } else {
            dispatch({ type: itemTypes.ADDING_FAILED })
            result.errors.map(({ message }) => toastr.error(message))
        }
    } catch ({ message }) {
        dispatch({ type: itemTypes.ADDING_FAILED });
        toastr.error(message)
    } finally {
        dispatch({ type: itemTypes.ADDING_COMPLETE });
    }
};

export const removedItem = (data, token: string) => async dispatch => {
    try {
        dispatch({ type: itemTypes.REMOVING_ITEM })
        const result = await Http.post(data, token);
        console.log(result)
        if (result.data) {
            dispatch({ type: itemTypes.ITEM_REMOVED, payload: result.data.removeItem })
        } else {
            dispatch({ type: itemTypes.REMOVING_FAILED })
            result.errors.map(({ message }) => toastr.error(message))
        }
    } catch ({ message }) {
        dispatch({ type: itemTypes.REMOVING_FAILED });
        toastr.error(message)
    } finally {
        dispatch({ type: itemTypes.REMOVING_COMPLETED });
    }
};

