import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer,productsCategoryReducer, productBrandReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer } from './reducers/productReducers.js'
import { cartReducer } from './reducers/cartReducers.js'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderMyListReducer, orderListReducer } from './reducers/orderReducers.js'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from './reducers/userReducers.js'

import {categoryListReducer} from './reducers/categoryReducers'
import {brandListReducer} from './reducers/brandReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productsCategory: productsCategoryReducer,
    productBrandList: productBrandReducer,
    productDetails: productDetailsReducer,
    productCreate: productCreateReducer,
    productDelete: productDeleteReducer,
    productUpdate: productUpdateReducer,


    cart: cartReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMyList: orderMyListReducer,
    orderList: orderListReducer,

    categoryList: categoryListReducer,
    brandList: brandListReducer,

})


const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    productList: {loading: true},
    productDetails: {loading: true},
    userDetails: {loading: true},
    orderMyList: {loading: true},
    orderList: {loading: true},
    productCategoryList: {loading: true},
    categoryList: {loading: true},
    brandList: {loadingBrand: true},
    productsCategory: {loadingCategory: true},
    productBrandList: {loadingProductBrand: true},
    userList: {loading: true},

    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
