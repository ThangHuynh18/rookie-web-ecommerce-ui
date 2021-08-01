import axios from 'axios';
import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL, CATEGORY_DETAILS_REQUEST, CATEGORY_DETAILS_SUCCESS, CATEGORY_DETAILS_FAIL, 
    CATEGORY_CREATE_REQUEST, CATEGORY_CREATE_SUCCESS, CATEGORY_CREATE_FAIL, CATEGORY_CREATE_RESET,
    CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_DELETE_FAIL,
    CATEGORY_UPDATE_REQUEST, CATEGORY_UPDATE_SUCCESS, CATEGORY_UPDATE_FAIL, CATEGORY_UPDATE_RESET,
    CATEGORY_PARENT_LIST_REQUEST, CATEGORY_PARENT_LIST_SUCCESS, CATEGORY_PARENT_LIST_FAIL,
    CATEGORY_BY_PARENT_REQUEST, CATEGORY_BY_PARENT_SUCCESS, CATEGORY_BY_PARENT_FAIL,
    PARENT_CREATE_REQUEST, PARENT_CREATE_SUCCESS, PARENT_CREATE_FAIL,
} from '../constants/categoryConstants';

export const listCategories = () => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST })
        const { data } = await axios.get('/api/categories')
        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const listParent = () => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_PARENT_LIST_REQUEST })
        const { data } = await axios.get('/api/categories/parent')
        dispatch({
            type: CATEGORY_PARENT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_PARENT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const getCategoryDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/categories/${id}`)
        dispatch({
            type: CATEGORY_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const listCategoriesByParent = (id) => async (dispatch) => {
    dispatch({
      type: CATEGORY_BY_PARENT_REQUEST,
    });
    try {
      const { data } = await axios.get(`/api/categories/parent/${id}`);
      dispatch({ type: CATEGORY_BY_PARENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ 
          type: CATEGORY_BY_PARENT_FAIL, 
          payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
  };

export const deleteCategory = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`
            },
        }

        await axios.delete(`/api/categories/category/${id}`, config)

        dispatch({
            type: CATEGORY_DELETE_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: CATEGORY_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const createCategory = (cateData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`
            },
        }
        
        const { data } = await axios.post(`/api/categories/category`, cateData, config)

        dispatch({
            type: CATEGORY_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CATEGORY_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const createParent = (parentData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PARENT_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`
            },
        }
        
        const { data } = await axios.post(`/api/categories/parent`, parentData, config)

        dispatch({
            type: PARENT_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PARENT_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const updateCategory = (cateEdit) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CATEGORY_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const { categoryDetails: { category } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.accessToken}`
            },
        }
        const { data } = await axios.put(`/api/categories/category/${category.data.category_id}`, cateEdit, config)

        dispatch({
            type: CATEGORY_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}