import {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET,
    USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_LIST_RESET, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET,
    USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_CREATE_FAIL,
    DETAILS_OF_USER_REQUEST, DETAILS_OF_USER_SUCCESS, DETAILS_OF_USER_FAIL,

} from '../constants/userConstants.js'

import { ORDER_MY_LIST_RESET } from '../constants/orderConstants'

import axios from 'axios'

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/signin', { username, password }, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const register = (username, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/signup', { username, email, password }, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('paymentMethod')
    localStorage.removeItem('shippingAddress')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_MY_LIST_RESET })
    dispatch({ type: USER_LIST_RESET })

}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST, payload: id
        })

        const { userLogin: { userInfo } } = getState()

        const { data } = await axios.get(`/api/users/${id}`, {
            headers: { Authorization: `Bearer ${userInfo.accessToken}`}})

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const getDetailsOfUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DETAILS_OF_USER_REQUEST, payload: id
        })

        const { userLogin: { userInfo } } = getState()

        const { data } = await axios.get(`/api/udetails/user/${id}`, {
            headers: { Authorization: `Bearer ${userInfo.accessToken}`}})

        dispatch({
            type: DETAILS_OF_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DETAILS_OF_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.accessToken}`
            },
        }

        const { data } = await axios.put(`/api/users/user/${userInfo.id}`, user, config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`
            },
        }

        const { data } = await axios.get('/api/users', config)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const createUser = (userData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`
            }
        }

        const { data } = await axios.post('/api/users/user', userData, config)

        dispatch({
            type: USER_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`
            },
        }

        await axios.delete(`/api/users/user/${id}`, config)

        dispatch({
            type: USER_DELETE_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const updateUser = (userData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const {userDetails : {user}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.accessToken}`
            },
        }

        const { data } = await axios.put(`/api/users/user/${user.data.user_id}`, userData, config)

        dispatch({
            type: USER_UPDATE_SUCCESS,
        })

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}
