import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import { newProductReducer, productDetailsReducer, productReducer,newReviewReducer,productReducerUd } from './reducer/productReducer';
import { saleReducer } from './reducer/saleReducer';
import authReducer, { allUsersReducer, userDetailsReducer, userReducer } from './reducer/userReducer';
import { cartReducer } from './reducer/cartReducer'
import{ allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer} from './reducer/orderReducer'

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    newReview: newReviewReducer,
    sales:saleReducer,
    auth : authReducer,
    user: userReducer,
    cart : cartReducer,
    newProduct: newProductReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer ,
    productUpdate:productReducerUd,
    userDetails: userDetailsReducer

})

let intialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
}

const middleware = [thunk]
const store = createStore (reducer, intialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;