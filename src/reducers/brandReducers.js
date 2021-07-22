import {
    BRAND_LIST_REQUEST,
    BRAND_LIST_SUCCESS,
    BRAND_LIST_FAIL,
} from '../constants/brandConstants';

export const brandListReducer = (state = { brands: [] }, action) => {
    switch (action.type) {
        case BRAND_LIST_REQUEST:
            return { loading: true, brands: [] }
        case BRAND_LIST_SUCCESS:
            return { loading: false, brands: action.payload.data }
        case BRAND_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}