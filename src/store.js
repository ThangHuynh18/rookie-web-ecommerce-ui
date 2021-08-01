import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productListAdminReducer, productsCategoryReducer, productBrandReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer } from './reducers/productReducers.js'
import { cartReducer } from './reducers/cartReducers.js'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderMyListReducer, orderListReducer, listDetailOrderReducer } from './reducers/orderReducers.js'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
    userCreateReducer,
    detailsOfUserReducer
} from './reducers/userReducers.js'

import {categoryListReducer, parentListReducer, categoriesByParentReducer, categoryDetailsReducer, categoryCreateReducer, parentCreateReducer, categoryDeleteReducer, categoryUpdateReducer} from './reducers/categoryReducers'
import {brandListReducer} from './reducers/brandReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productListAdmin: productListAdminReducer,
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
    userCreate: userCreateReducer,
    detailsOfUser: detailsOfUserReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMyList: orderMyListReducer,
    orderList: orderListReducer,
    listDetail: listDetailOrderReducer,

    categoryList: categoryListReducer,
    brandList: brandListReducer,

    parentList: parentListReducer,
    categoryByParentList: categoriesByParentReducer,
    categoryDetails: categoryDetailsReducer,
    categoryCreate: categoryCreateReducer,
    categoryDelete: categoryDeleteReducer,
    categoryUpdate: categoryUpdateReducer,
    parentCreate: parentCreateReducer,

})


const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    productList: {loading: true},
    productListAdmin: {loading: true},
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
    categoryDetails: {loading: true},
    detailsOfUser: {loading: true},
    listDetail: {loading: true},

    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
