import { authAPI } from "../api/api";
import { stopSubmit, reset } from "redux-form";
import { Redirect } from "react-router";
const SET_USER_Register_DATA = "SET_USER_Register_DATA";
const SET_USER_Login_DATA = "SET_USER_Login_DATA";
const GET__User_TOKEN = "GET__User_TOKEN";
const GET_User_DATA = "GET_User_DATA";
const GET_USER_EDIT_DATA="GET_USER_EDIT_DATA";
const GET_USER_EDIT_RES="GET_USER_EDIT_RES";
const GET_USER_EDIT_PASS="GET_USER_EDIT_PASS";
const Log_Out_Success = "Log_Out_Success";
const GET_USER_FILE_ERROR="GET_USER_FILE_ERROR";

// const GET_User_Error = "GET__User_Error";
const initialState = {
    registerData: null,
    login: null,
    user: [],
    token:JSON.parse(localStorage.getItem("token")),
    isLogout: false,
    res:null,
    pass:null,
    uploadError:null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_Register_DATA:
            return {
                ...state,
                registerData: action.payload
            }
        case SET_USER_Login_DATA:
            return {
                ...state,
                login: action.payload
            }
        case GET_User_DATA:
            return {
                ...state,
                user: action.data
            }
            case GET__User_TOKEN:
                return {
                    ...state,
                    token: localStorage.setItem("token", JSON.stringify(action.data))
                }
        case Log_Out_Success:
            return {
                ...state,
                isLogout: !state.isLogout
            }
        
             case GET_USER_EDIT_RES:
            return {
                ...state,
                res: action.res
            }
            case GET_USER_EDIT_PASS:
                return {
                    ...state,
                    pass: action.pass
                }
                case GET_USER_FILE_ERROR:
                    return {
                        ...state,
                        uploadError: action.file
                    }
 

        default:
            return state;
    }
}
export const getUserEditRes = (res) => ({ type: GET_USER_EDIT_RES,res })
export const getUserFileError = (file) => ({ type: GET_USER_FILE_ERROR,file })

export const getUserEditPass = (pass) => ({ type: GET_USER_EDIT_PASS,pass })

export const LogOutSuccess = () => ({ type: Log_Out_Success })
export const setUserToken = (data) => ({ type: GET__User_TOKEN, data });
export const setUserData = (data) => ({ type: GET_User_DATA, data });

// export const setUsersError = (error) => ({ type: GET_User_Error, error });

export const setUserRegisterData = (payload) => ({ type: SET_USER_Register_DATA, payload });
export const setUserLoginData = (payload) => ({ type: SET_USER_Login_DATA, payload });

export const getUserRegisterData = (name, email, password) => async (dispatch) => {

    try {
        const response = await authAPI.register(name, email, password)
        dispatch(setUserRegisterData(response.data.user));
        dispatch(setUserToken(response.data.token));
    }
    catch (error) {
        dispatch(stopSubmit("register", { _error: error.response.data.message }))
    }

}

export const authSocial = (id, email, name, avatar, social) => async (dispatch) => {
    try {
        const response = await authAPI.socialAuth(id, email, name, avatar, social)
        // console.log(response);
        // dispatch(setUserRegisterData(response.data.user));
        dispatch(setUserToken(response.data.token));
    }
    catch (error) {
        dispatch(stopSubmit("register", { _error: error.response.data.message }))
    }
}


export const getUserLoginData = (email, password) => async (dispatch) => {

    try {
        const response = await authAPI.login(email, password)
        if (response.data.success) {
            dispatch(setUserLoginData(response.data.user));
            dispatch(setUserToken(response.data.token))
        }

    }
    catch (error) {
         dispatch(stopSubmit("login", { _error: error.response.data.message }))

    }



}
export const getUserData = () => async (dispatch) => {

    try {
        const response = await authAPI.getUserData()
        
        if (response.data.success) {
       
            dispatch(setUserData(response.data.user));

        }

    }
    catch (error) {
        //  dispatch(stopSubmit("login", { _error: error.response.data.message }))

    }

}


export const editUserAvatar = (avatar) => async (dispatch) => {
    try{
        await authAPI.editUserAvatar(avatar)
    }
    catch(error){
        dispatch(getUserFileError("File too large"))
    }
  }
  export const editUserData = (name, email,surname, price, fb_link, insta_link) => async (dispatch) => {
  
         try{
           const response=await authAPI.editUserData(name, email, surname, price, fb_link, insta_link);
             dispatch(getUserEditRes(response.data))
         }
         catch(error){
            dispatch(getUserEditRes(error.response.data))
         }
  
  }
  export const editUserPassword = (old_password,new_password,confirm_password) => async (dispatch) => {
        try{
           const response = await authAPI.editUserPassword(old_password,new_password,confirm_password)
           dispatch(getUserEditPass(response.data))
           dispatch(reset('change-password'))
           
        }
        catch(error){
            dispatch(getUserEditPass(error.response.data))
        }
  
  }
export default authReducer;