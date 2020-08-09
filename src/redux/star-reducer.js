import {starApi} from "../api/api";

const GET_sINGLE_STAR_DATA = "GET_sINGLE_STAR_DATA";
const GET_ALL_STARS_DATAS = "GET_ALL_STARS_DATAS";
const GET_STARS_SEARCH_DATAS = "GET_STARS_SEARCH_DATAS";
const Toggle_Is_Fetching = "Toggle_Is_Fetching";
const SEARCHED_STAR = "SEARCHED_STAR";
const CHANGE_SLUG = "CHANGE_SLUG";
const UPLOAD_VIDEO = "UPLOAD_VIDEO";
const VERIFY_RESPONSE = "VERIFY_RESPONSE";
const PERMISSION_SUCCESS = "PERMISSION_SUCCESS"


const initialState = {
    star: [],
    stars: [],
    searchRes: [],
    isFetching: true,
    searched: [],
    finish: false,
    skip: null,
    slug: null,
    verifyResponse: null,
    permissionSuccess: ''
};

const starReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_sINGLE_STAR_DATA:
            return {
                ...state,
                star: action.data
            }

        case GET_ALL_STARS_DATAS:
            return {
                ...state,
                stars: action.data
            }
        case GET_STARS_SEARCH_DATAS:
            return {
                ...state,
                searchRes: action.data.stars,
                finish: action.data.finish
            }
        case Toggle_Is_Fetching:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case CHANGE_SLUG:
            return {
                ...state,
                slug: action.slug
            }
        case SEARCHED_STAR:
            return {
                ...state,
                searched: action.value.skip == 0 ? action.value.stars : [...state.searched, ...action.value.stars],
                finish: action.value.finish,
                count: action.value.count
            }
        case VERIFY_RESPONSE:
            return {
                ...state,
                verifyResponse: action.value
            }
        case PERMISSION_SUCCESS:
            return {
                ...state,
                permissionSuccess: action.value
            }

        default:
            return state;
    }
}
export const changeSlug = (slug) => ({type: CHANGE_SLUG, slug})
const toggleIsFetching = (isFetching) => ({type: Toggle_Is_Fetching, isFetching})
const setSearchedStarSuccess = (value) => ({type: SEARCHED_STAR, value})

export const setSingleStarData = (data) => ({type: GET_sINGLE_STAR_DATA, data})
export const verifyResponse = (value) => ({type: VERIFY_RESPONSE, value})
export const permissionSuccess = (value) => ({type: PERMISSION_SUCCESS, value})

export const setAllStarsDatas = (data) => ({type: GET_ALL_STARS_DATAS, data})

export const setStarSearchDatas = (data) => ({type: GET_STARS_SEARCH_DATAS, data})


export const getSingleStarData = (star) => async (dispatch) => {
    try {
        const response = await starApi.getSingleStar(star)
        dispatch(setSingleStarData(response.data.star))
    } catch (error) {

    }


}
export const getAllStarsDatas = () => async (dispatch) => {
    const response = await starApi.getAllStars()
    dispatch(setAllStarsDatas(response.data.stars))
}
export const searchStar = (star, skip) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    const response = await starApi.search(star, skip)
    dispatch(setStarSearchDatas(response.data))
    dispatch(toggleIsFetching(false))
}
export const searchStarForAll = (star, skip, sort) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    const response = await starApi.search(star, skip, sort)
    dispatch(setSearchedStarSuccess(response.data))
    dispatch(toggleIsFetching(false))
}
export const uploadVideo = (video, orderId) => async (dispatch) => {
    await starApi.uploadVideo(video, orderId)
}
export const verifyStar = (type, email, password) => async (dispatch) => {
    try {
        const response = await starApi.verifyStar(type, email, password)
        dispatch(verifyResponse(response.data))
    } catch (error) {
        dispatch(verifyResponse(error.response.data))

    }
}
export const registerPermission = (token) => async (dispatch) => {
    try {
        const response = await starApi.starRegisterPermission(token);
        dispatch(permissionSuccess(response.data.success))
    } catch (error) {
        dispatch(permissionSuccess(error.response.data.success))
    }
}
export const registerStar = (name,surname,email,phone,price,cat_id,password,token) => async (dispatch) => {
    try {
        const response = await starApi.registerStar(name,surname,email,phone,price,cat_id,password,token);
        // dispatch(permissionSuccess(response.data.success))
    } catch (error) {
        // dispatch(permissionSuccess(error.response.data.success))
    }
}


export default starReducer;