import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
    PRODUCT_CATEGORY_REQUEST, PRODUCT_CATEGORY_SUCCESS, PRODUCT_CATEGORY_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL,
    PRODUCT_BRAND_REQUEST, PRODUCT_BRAND_SUCCESS, PRODUCT_BRAND_FAIL,
    PRODUCT_LIST_ADMIN_REQUEST, PRODUCT_LIST_ADMIN_SUCCESS, PRODUCT_LIST_ADMIN_FAIL
} from '../constants/productConstants.js'

import axios from 'axios'

export const listProducts = (keyword = '', currentPage = 1, cateId, brandId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        currentPage--
        let url = `/api/products/pagination?search=${keyword}&page=${currentPage}`
        if (cateId) {
            url = `/api/products/pagination?page=${currentPage}&cateId=${cateId}`
            

        }
        if (brandId) {
            url = `/api/products/pagination?page=${currentPage}&brandId=${brandId}`
        }
        if (cateId && brandId) {
            console.log(`----${cateId}-----${brandId}`)
            url = `/api/products/pagination?page=${currentPage}&cateId=${cateId}&brandId=${brandId}`
        }
        const { data } = await axios.get(url)
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const listProductsAdmin = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_ADMIN_REQUEST })
        const { data } = await axios.get('/api/products')
        dispatch({
            type: PRODUCT_LIST_ADMIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_ADMIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const listProductCategories = (id) => async (dispatch) => {
    dispatch({
      type: PRODUCT_CATEGORY_REQUEST,
    });
    try {
      const { data } = await axios.get(`/api/products/category/${id}`);
      dispatch({ type: PRODUCT_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ 
          type: PRODUCT_CATEGORY_FAIL, 
          payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
  };

  export const listProductBrands = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_BRAND_REQUEST })
        const { data } = await axios.get(`/api/products/brand/${id}`)
        dispatch({
            type: PRODUCT_BRAND_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_BRAND_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`
            },
        }

        await axios.delete(`/api/products/product/${id}`, config)

        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const createProduct = (productData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`
            },
        }
        
        const { data } = await axios.post(`/api/products/product`, productData, config)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const updateProduct = (productEdit) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const { productDetails: { product } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.accessToken}`
            },
        }
        const { data } = await axios.put(`/api/products/product/${product.data.product_id}`, productEdit, config)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}