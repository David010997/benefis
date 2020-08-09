import { rateApi } from "../api/api";

const RATE_STAR = "RATE_STAR";
const initialState = {
    rating:false
};

const ratingReducer = (state = initialState, action) => {
    switch (action.type) {
        case RATE_STAR:
            return {
                ...state,
                rating: action.data
            }
          

        default:
            return state;
    }
}
   
  export  const setStarRating=(data)=>({type:RATE_STAR, data})
  export const getStarRating = (rating,slug) => async (dispatch) => {
    const response = await rateApi.rating(rating,slug)
    dispatch(setStarRating(response.data))
}

export default ratingReducer;