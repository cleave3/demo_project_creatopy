import { Reducer } from 'redux';
import * as ItemTypes from "../types/Types"

const initalState: ItemState = {
    submitting: false,
    removing: false,
    loading: false,
    items: []
};

const reducer: Reducer<ItemState> = (state = initalState, action) => {
    switch (action.type) {
        case ItemTypes.ADDING_ITEM:
            return {
                ...state,
                submitting: true
            };
        case ItemTypes.ITEM_ADDED:
            return {
                ...state,
                submitting: false,
                items: [action.payload, ...state.items]
            };
        case ItemTypes.ADDING_FAILED:
            return {
                ...state,
                submitting: false
            };
        case ItemTypes.FETCHING_ITEMS:
            return {
                ...state,
                loading: true
            };
        case ItemTypes.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload
            };
        case ItemTypes.FETCHING_FAILED:
        case ItemTypes.FETCHING_COMPLETED:
            return {
                ...state,
                loading: false
            };
        case ItemTypes.REMOVING_ITEM:
            return {
                ...state,
                removing: true
            };
        case ItemTypes.REMOVING_FAILED:
        case ItemTypes.REMOVING_COMPLETED:
            return {
                ...state,
                removing: false
            };
        case ItemTypes.ITEM_REMOVED:
            const remainder = state.items.filter(item => item.id !== action.payload.id);
            return {
                ...state,
                removing: false,
                items: remainder
            };
        default:
            return state;
    }
};

export default reducer;
