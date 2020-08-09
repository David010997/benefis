import React, {Component} from 'react';
import {Route, BrowserRouter, Switch, Redirect, Link} from "react-router-dom";
import Home from './Components/Home/Home';
import StarProfile from './Components/Star/StarProfile/StarProfile';
import UserProfile from './Components/UserProfile/UserProfile';
import {createBrowserHistory} from 'history';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import StarPage from './Components/Star/StarPage/StarPage';
import StarCategoryPage from './Components/StarCategoryPage';
import Categories from './Components/Categories/Categories';
import FavouriteStarPage from './Components/FavouriteStarPage/FavouriteStarPage'
import SearchPage from './Components/SearchPage/SearchPage';
import {PrivateRouteHome, PrivateRouteLogin} from './Components/PrivateRoutes';
import Error from './Components/Error404';
import {connect} from 'react-redux';
import {getUserData} from './redux/auth-reducer';
import PrivateRouteStar from './Components/PrivateRoutes/PrivateRouteStar'
import PrivateRouteUser from './Components/PrivateRoutes/PrivateRouteUser'
import Payment from './Components/Payment';
import {withTranslation} from 'react-i18next';
import i18next from 'i18next';
import Help from './Components/Help';
import Privacy from './Components/Privacy';
import Terms from './Components/Terms';
import AboutUs from './Components/AboutUs';
import StarRegister from './Components/StarRegister/StarRegister';
import PrivateRouteRegisterStar from './Components/PrivateRoutes/PrivateRouteRegisterStar';



class App extends Component {

    render() {

        return (

            <BrowserRouter>
                <Switch>
                    <Route path="/" exact render={() => <Home/>}/>
                    <PrivateRouteHome path="/login"  component={Login}/>
                    <PrivateRouteHome path="/register" component={Register}/>
                    <Route path="/categories/:slug/:child?" render={() => <Categories/>}/>
                    <PrivateRouteRegisterStar path="/star-register/:token" component={StarRegister} />
                    <Route path="/404" render={() => <Error/>}/>
                    <Route path="/favourite-star" render={() => <FavouriteStarPage/>}/>
                    <Route path="/star-page/:star?" exact render={() => <StarPage/>}/>
                    <Route path="/search" render={() => <SearchPage/>}/>
                    <Route path="/payment" render={() => <Payment/>}/>
                    <PrivateRouteStar exact path="/star-profile" component={StarProfile}/>
                    <PrivateRouteUser path="/user-profile" component={UserProfile}/>
                    <Route path="/help" component={Help}/>
                    <Route path="/privacy" component={Privacy}/>
                    <Route path="/terms" component={Terms}/>
                    <Route path="/about-us" component={AboutUs}/>
                    <Redirect to="/404"/>
                </Switch>
            </BrowserRouter>

        )
    }
}


export default withTranslation()(App);
