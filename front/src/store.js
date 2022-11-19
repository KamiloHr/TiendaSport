import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import { productReducer,productDetailsReducer, newProductReducer } from './reducer/productReducer';
import  autReducer, { forgotPasswordReducer, userReducer }  from './reducer/userReducer';
import { cartReducer } from './reducer/cartReducer';

const reducer = combineReducers({
    products: productReducer,
    productDetails:productDetailsReducer,
    auth : autReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newProduct: newProductReducer
})

let intialState = {
    cart:{
        cartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[]
    }
}

const middleware = [thunk]
const store = createStore (reducer, intialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;