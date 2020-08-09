import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getUserData } from '../../redux/auth-reducer';
import { Route, withRouter } from 'react-router';

class PrivateRouteStar extends Component{
    async componentDidMount () {
        const token=JSON.parse(localStorage.getItem('token'))  
        await this.props.getUserData(token)
        this.props.user.role!=="star"&&this.props.history.push('/404')
    }
    render(){
        const token=JSON.parse(localStorage.getItem('token')) 
        const {role}=this.props.user 
        return(    
            token&&role==="star"
            && <Route { ...this.props } />       
        )
    }
}
const mapStateToProps=state=>{
    return{
        user:state.auth.user
    }
}
export default compose(connect(mapStateToProps,{getUserData}),withRouter)(PrivateRouteStar);