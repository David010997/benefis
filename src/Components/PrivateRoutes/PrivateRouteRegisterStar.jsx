import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { registerPermission } from '../../redux/star-reducer';
import { Route, withRouter, Redirect } from 'react-router';
import Lines from "react-preloaders/lib/Lines/Lines";

class PrivateRouteRegisterStar extends Component {
    state = {
        isFetching: true
    };

    async componentDidMount() {
        const { pathname } = this.props.location
        const token = pathname.slice(15)
        await this.props.registerPermission(token);
        this.setState({
            isFetching: this.props.permissionSuccess !== '' && false
        })
    }

    render() {
        const { permissionSuccess } = this.props;
        const { isFetching } = this.state;
        console.log(permissionSuccess);

        return (
            <>
                {permissionSuccess === '' ? <Lines customLoading={isFetching}/> :
                    (permissionSuccess === true ? <Route {...this.props} /> : <Redirect to='/404'/>)}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        permissionSuccess: state.stars.permissionSuccess,
    }
}
export default compose(connect(mapStateToProps, { registerPermission }), withRouter)(PrivateRouteRegisterStar);