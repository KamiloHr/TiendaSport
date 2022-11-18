import axios from 'axios';

import {
    ALL_SALES_REQUEST,
    ALL_SALES_SUCCESS,
    ALL_SALES_FAIL,
    CLEAR_ERRORS
} from '../constants/saleConstants';

export const getSales = () => async(dispatch) =>{
    try{
        dispatch ({type : ALL_SALES_REQUEST})
        
        const{data} = await axios.get('/api/sales')

        dispatch({
            type:ALL_SALES_SUCCESS,
            payload: data
        })
    }catch (error){
        dispatch({
            type:ALL_SALES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}