import { ALL_SALES_REQUEST, ALL_SALES_SUCCESS, ALL_SALES_FAIL,
    CLEAR_ERRORS} from "../constants/saleConstants";

export const saleReducer = (state = {sales: []}, action) =>{
    switch(action.type){
        case ALL_SALES_REQUEST:
            return{
                loading : true,
                sales : []
            }
        case ALL_SALES_SUCCESS:
            return{
                loading : false,
                ventas : action.payload.ventas,
                cantidad : action.cantidad
            }
        case ALL_SALES_FAIL:
            return{
                loading : false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }
        default:
            return state;
    }
    
}