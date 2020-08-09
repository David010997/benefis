import React, {Component} from 'react'
import {Link, Redirect, withRouter} from 'react-router-dom';
import Wrapper from '../Wrapper';
import {reduxForm, Field, reducer, getFormMeta} from 'redux-form';
import {required, minLength, maxLength, email, passwordsMustMatch} from '../../utils/validate';
import {RenderField, renderCheckbox, RenderFieldForStarVal} from '../FormControls/FormControls';
import {connect} from 'react-redux';
import {getUserRegisterData, authSocial} from '../../redux/auth-reducer';
import FacebookLogin from 'react-facebook-login';
import InstagramLogin from 'react-instagram-login';
import {compose} from 'redux';
import {withTranslation} from 'react-i18next';
import "./Register.scss"

class RegisterForm extends Component {
    state = {
        error: undefined
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.error !== undefined) {
            this.setState({
                error: prevProps.error
            })
        }
    }

    render() {
        const {t} = this.props
        const maxLength15 = maxLength(3, 15);
        const minLength3 = minLength(3, 15);
        return (

            <form onSubmit={this.props.handleSubmit}>
                <div className="form-group">

                    <Field type="text" validate={[required, minLength3, maxLength15]} component={RenderFieldForStarVal}
                           name="name" id="name" label="Username"/>
                </div>
                <div className="form-group">

                    <Field type="email" validate={[required, email]} component={RenderFieldForStarVal} name="email" id="email"
                           label="email"/>
                </div>
                <div className="form-group">

                    <Field type="password" validate={[required, minLength3, maxLength15]} component={RenderFieldForStarVal}
                           name="password" id="password" label="********"/>
                </div>
                <div className="form-group">
                    <Field type="password" validate={[required, passwordsMustMatch]} component={RenderFieldForStarVal}
                           name="confirmation" id="passwordRepeat" label="********"/>
                </div>
                <div className="terms-checkbox">
                    <Field name="terms" id="terms" className="register-checkbox" terms={t('terms of service')}
                           component={renderCheckbox} validate={[required]} type="checkbox"/>
                </div>
                <div className="m-t-lg">
                    <ul className="list-inline">
                        <li>
                            <button className="btn btn--form">Register</button>
                        </li>
                        <li>
                            <a className="signup__link" href="#">I am already a member</a>
                        </li>
                    </ul>
                </div>
                <div className="invalidAuth-error"> {this.state.error && this.state.error}</div>

            </form>

        )

    }
}

const RegisterReduxForm = reduxForm({form: 'register'})(RegisterForm)

class Register extends Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    onSubmit = async (formData) => {
        const {name, email, password} = formData
        await this.props.getUserRegisterData(name, email, password)
        const token = JSON.parse(localStorage.getItem("token"))
        token && this.props.history.push('/')
    }

    // componentClicked = () => {
    //     console.log('clicked')
    // }

    responseFacebook = async (formData) => {
        const {id, name, email, picture: {data: {url}}} = formData;
        await this.props.authSocial(id, email, name, url, 'facebook');
        const token = JSON.parse(localStorage.getItem("token"));
        token && this.props.history.push('/')
    }

    // responseInstagram = async (formData) => {
    //     console.log(formData)
    // }

    failInstagram = async () => {
        this.props.history.push('/')
    }

    render() {
        const {t} = this.props

        return (
            <Wrapper>
                <div className="main__register">

                    <section className="signup">
                        {/* <img src={grey} alt="" /> */}
                        <div className="container-register">
                            <div className="signup-content">
                                <div className="signup__container">
                                    <div className="container__child signup__thumbnail">
                                        <div className="thumbnail__logo">
                                            <h1 className="logo__text">Benefis</h1>
                                        </div>
                                        <div className="auth-icons">
                                            <div className="fb-icon">
                                                <FacebookLogin
                                                    appId="760779791419102"
                                                    fields="name,email,picture"
                                                    onClick={this.componentClicked}
                                                    callback={this.responseFacebook}/>
                                            </div>
                                            <div className="insta-icon">
                                                <InstagramLogin
                                                    clientId="803396753529815"
                                                    buttonText="Login"
                                                    scope="user_profile"
                                                    redirectUri="https://localhost:3000/register"
                                                    onSuccess={this.responseInstagram}
                                                />
                                            </div>
                                            <div className="vk-icon">Sign up with vk</div>
                                        </div>
                                        <div className="thumbnail__links">

                                        </div>
                                        <div className="signup__overlay"></div>
                                    </div>
                                    <div className="container__child signup__form">
                                        <RegisterReduxForm onSubmit={this.onSubmit} t={t}/>
                                        {/* <p className="loginhere">
                                    {t('have an account?')} <a href="/login" className="loginhere-link">{t('login here')}</a>
                                </p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </Wrapper>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        register: state.auth.registerData,

    }
}
export default compose(connect(mapStateToProps, {getUserRegisterData, authSocial}), withRouter, withTranslation())(Register);