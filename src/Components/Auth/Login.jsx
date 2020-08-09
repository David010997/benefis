import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import Wrapper from '../Wrapper';
import { reduxForm, Field } from 'redux-form';
import { getUserLoginData, LogOutSuccess } from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import { renderCheckbox } from '../FormControls/FormControls';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';
import "./Login.scss"
class LoginForm extends Component {
  state = {
    error: undefined,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.error !== undefined) {
      this.setState({
        error: prevProps.error
      })
    }
  }

  render() {
    const { t } = this.props
    return (
      <form onSubmit={this.props.handleSubmit} >

        <div className="form-group">

          <Field type="email" className="form-control form-control-auth" component="input" name="email" id="email" placeholder="email" />
        </div>
        <div className="form-group">

          <Field type="password" className="form-control form-control-auth" component="input" name="password" id="password" placeholder="********" />
        </div>

        <div className="checkbox__div" >
          <Field name="terms" id="terms" className="login__checkbox" terms={t('terms of service')} component="input" type="checkbox" />
          <label htmlFor="terms" className="login__label">Remember me</label>
        </div>
        <div className="m-t-lg">
          <ul className="list-inline">
            <li>
              <button className="btn btn--form"  >Login</button>
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
const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

class Login extends Component {

  componentDidMount () {
     window.scrollTo(0, 0)
  }
  onSubmit = async (formData) => {
    const { email, password } = formData
    await this.props.getUserLoginData(email, password)
    const user = JSON.parse(localStorage.getItem("token"))
    user && this.props.history.push('/')
  }
  render() {
    const { t } = this.props

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
                        <div className="fb-icon">Sign up with facebook</div>
                        <div className="insta-icon">Sign up with instagram</div>
                        <div className="vk-icon">Sign up with vk</div>
                      </div>
                    <div className="thumbnail__links">

                    </div>
                    <div className="signup__overlay"></div>
                  </div>
                  <div className="container__child signup__form">
                    <LoginReduxForm onSubmit={this.onSubmit} t={t} />
                    {/* <p className="loginhere">
                      {t('no account?')} <Link to="/register" className="loginhere-link">{t('register here')}</Link>
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
    login: state.auth.login,
    logout: state.auth.isLogout,
    error: state.auth.error
  }
}
export default compose(connect(mapStateToProps, { LogOutSuccess, getUserLoginData }), withRouter, withTranslation())(Login);