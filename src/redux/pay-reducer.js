import { paymentApi } from "../api/api";

const ACCEPT_PAY = "ACCEPT_PAY";
const GET_PAY_EMAIL = "GET_PAY_EMAIL";
const GET_PAY_INFO = "GET_PAY_INFO";


const initialState = {
    res: null,
    email:"",
    formData:null
};

const payReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCEPT_PAY:
            return {
                ...state,
                res: action.data
            }
            case GET_PAY_EMAIL:
                return {
                    ...state,
                    email: action.data
                }
                case GET_PAY_INFO:
                    return {
                        ...state,
                        formData: action.data
                    }

        default:
            return state;
    }
}

export const setAcceptPay = (data) => ({ type: ACCEPT_PAY, data })
export const setEmail = (data) => ({ type: GET_PAY_EMAIL, data })
export const setPayInfo = (data) => ({ type: GET_PAY_INFO, data })


export const getAcceptPay = (email) => async (dispatch) => {
    const response = await paymentApi.pay(email)
    dispatch(setAcceptPay(response.data))
}

export default payReducer;