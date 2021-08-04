import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
    PRODUCT_CATEGORY_REQUEST, PRODUCT_CATEGORY_SUCCESS, PRODUCT_CATEGORY_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
    PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_RESET,
    PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
    PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_RESET,
    PRODUCT_BRAND_REQUEST, PRODUCT_BRAND_SUCCESS, PRODUCT_BRAND_FAIL,
    PRODUCT_LIST_ADMIN_REQUEST, PRODUCT_LIST_ADMIN_SUCCESS, PRODUCT_LIST_ADMIN_FAIL, PRODUCT_DELETE_RESET
} from '../constants/productConstants.js'

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return { 
                loading: false, 
                products: action.payload.products,
                totalItems: action.payload.totalItems,                
            }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productListAdminReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_ADMIN_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_ADMIN_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_ADMIN_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productsCategoryReducer = (state = { productsCate: [] }, action) => {
    switch (action.type) {
        case PRODUCT_CATEGORY_REQUEST:
            return { loading: true, productsCate: [] }
        case PRODUCT_CATEGORY_SUCCESS:
            return { loading: false, productsCate: action.payload.data }
        case PRODUCT_CATEGORY_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productBrandReducer = (state = { productBrands: [] }, action) => {
    switch (action.type) {
        case PRODUCT_BRAND_REQUEST:
            return { loading: true, productBrands: [] }
        case PRODUCT_BRAND_SUCCESS:
            return { loading: false, productBrands: action.payload.data }
        case PRODUCT_BRAND_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true }
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_DELETE_RESET:
                return {}
        default:
            return state
    }
}

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true }
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_UPDATE_RESET:
            return { product: {} }
        default:
            return state
    }
}
