import { categoryAPI } from "../api/api";
const Get_Star_Category = "Get_Star_Category";
const Toggle_Is_Fetching="Toggle_Is_Fetching";
const Set_Value="Set_Value";
const GET_CATEGORY="GET_CATEGORY";
const GET_SUB="GET_SUB";

const initialState = {
    category: [],
    isFetching:true,
    value:JSON.parse(localStorage.getItem('user'))&&JSON.parse(localStorage.getItem('user')).username,
    starByCat:[],
    sub:[]
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case Get_Star_Category:
            return {
                ...state,
                category: action.data
            }
            case Toggle_Is_Fetching:
                return {
                    ...state,
                    isFetching: action.isFetching
                }
                case Set_Value:
                    return {
                        ...state,
                        value: action.val
                    }
                    case GET_CATEGORY:
                    return {
                        ...state,
                        starByCat: action.value
                    }
                    case GET_SUB:
                        return {
                            ...state,
                            sub: action.value
                        }

        default:
            return state;
    }
}
    export const setValue=(val)=>({type:Set_Value,val})
    const setStarCategory = (data) => ({ type: Get_Star_Category, data });
    const setCategoryBySlug = (value) => ({ type: GET_CATEGORY, value });
    const setSubByCat = (value) => ({ type: GET_SUB, value });

    const toggleIsFetching=(isFetching)=>({type:Toggle_Is_Fetching, isFetching})

    export const getStarCategory = () => async (dispatch) => {
        dispatch(toggleIsFetching(true))
        const response = await categoryAPI.category()
        dispatch(setStarCategory(response.data.categories)); 
        dispatch(toggleIsFetching(false))
       
         
}
export const getStarByCat = (slug,sort) => async (dispatch) => {
    const response = await categoryAPI.getCategory(slug,sort)    
    if(response.data.success){
        dispatch(setCategoryBySlug(response.data.category.stars))
    }
     
}
export const getSubByCat = (slug,sort) => async (dispatch) => {
    const response = await categoryAPI.getCategory(slug,sort)    
    if(response.data.success){
        dispatch(setSubByCat(response.data.category.subcategories))
    }
     
}

export default categoryReducer;