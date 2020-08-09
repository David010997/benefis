const TOGGLE_REVIEW_MODAL = "TOGGLE_REVIEW_MODAL";
const initialState = {
    showModal:false
};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_REVIEW_MODAL:
            return {
                ...state,
                showModal: action.data
            }
          

        default:
            return state;
    }
}
   
  export  const toggleReviewModal=(data)=>({type:TOGGLE_REVIEW_MODAL, data})


export default reviewReducer;