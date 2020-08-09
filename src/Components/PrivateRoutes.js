import React from 'react'
import { Route, Redirect } from "react-router-dom";
export const PrivateRouteHome = ({ isLoggedIn, ...props }) =>{
  const token=JSON.parse(localStorage.getItem('token'))  
      return(
  !token
  ? <Route { ...props } />
  : <Redirect to="/" />
      )
  }
    export const PrivateRouteLogin = ({ isLoggedIn, ...props }) =>{

    const token=JSON.parse(localStorage.getItem('token'))
        return(
    token
    ? <Route { ...props } />
    : <Redirect to="/login" />
        )
    }
    // export const PrivateRouteUser = ({ role, ...props}) =>{
    //     const token=JSON.parse(localStorage.getItem('token'))  
    //         return(
    //             token&&[role==="user"||null]
    //             ? <Route { ...props } />
    //             : <Redirect to="/404" />
    //         )
    //     }
        // export const PrivateRouteStar = ({ role, ...props }) =>{
        // console.log(role);
        
        //     const token=JSON.parse(localStorage.getItem('token'))  
        //         return(
        //     token&&role==="star"
        //     ? <Route { ...props } />
        //     : <Redirect to="/404" />
        //         )
        //     }
    
   