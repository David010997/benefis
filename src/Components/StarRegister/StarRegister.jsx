import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom';
import Wrapper from '../Wrapper';
import { reduxForm, Field, reducer, getFormMeta } from 'redux-form';
import { required, minLength3, maxLength15, email, passwordsMustMatch } from '../../utils/validate';
import { RenderField, renderCheckbox } from '../FormControls/FormControls';
import { connect } from 'react-redux';
import { getUserRegisterData, authSocial } from '../../redux/auth-reducer';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { RenderFieldForStarVal } from '../FormControls/FormControls';
import { getStarCategory } from '../../redux/category-reducer';
import { registerStar } from '../../redux/star-reducer';

import "./StarRegister.scss"

class StarRegisterForm extends Component {
    state = {
        error: undefined
    }



    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.error !== undefined) {
    //         this.setState({
    //             error: prevProps.error
    //         })
    //     }
    // }

    render() {
        const { t, category } = this.props
        return (
            <form id="contact" onSubmit={this.props.handleSubmit}>
                <div className="row">
                    <div className="col-md-12">
                        <fieldset>
                            <Field
                                validate={[required, minLength3, maxLength15]}
                                component={RenderFieldForStarVal}
                                name="name"
                                type="text"
                                className="form-control"
                                id="subject"
                                label="name..."
                            />
                        </fieldset>
                    </div>
                    <div className="col-md-12">
                        <fieldset>
                            <Field
                                validate={[required, minLength3, maxLength15]}
                                component={RenderFieldForStarVal}
                                name="surname"
                                type="text"
                                className="form-control"
                                id="subject"
                                label="surname..."

                            />
                        </fieldset>
                    </div>
                    <div className="col-md-12">
                        <fieldset>
                            <Field
                                validate={[required]}
                                component={RenderFieldForStarVal}
                                name="email"
                                type="text"
                                className="form-control"
                                id="subject"
                                label="email..."

                            />
                        </fieldset>
                    </div>
                    <div className="col-md-12">
                        <fieldset>
                            <Field
                                validate={[required]}
                                component={RenderFieldForStarVal}
                                name="phone"
                                type="number"
                                className="form-control"
                                id="name"
                                label="phone..."

                            />
                        </fieldset>
                    </div>

                    <div className="col-md-12">
                        <fieldset>
                            <Field
                                validate={[required]}
                                component={RenderFieldForStarVal}
                                name="price"
                                type="text"
                                className="form-control"
                                id="subject"
                                label="price..."

                            />
                        </fieldset>
                    </div>

                    <div className="col-md-12">
                        <fieldset>
                            <Field
                                validate={[required]}
                                component="select"
                                name="cat_id"
                                type="text"
                                className="form-control form-control-select"
                                id="subject"
                            >

                                {category.map(c => {
                                    return <option value={c._id} key={c._id}>{c.name.en}</option>
                                })}
                            </Field>
                        </fieldset>
                    </div>
                    <div className="col-md-12">
                        <fieldset>
                            <Field
                                validate={[required, minLength3, maxLength15]}
                                component={RenderFieldForStarVal}
                                name="password"
                                type="password"
                                className="form-control"
                                id="subject"
                                label="********"

                            />
                        </fieldset>
                    </div>
                    <div className="col-md-12">
                        <fieldset>
                            <Field
                                validate={[required, passwordsMustMatch]}
                                component={RenderFieldForStarVal}
                                name="confirm_password"
                                type="password"
                                className="form-control"
                                id="subject"
                                label="********"

                            />
                        </fieldset>
                    </div>
                    <div className="terms-checkbox-star">
                        <Field name="terms" id="terms" className="register-checkbox" terms={t('terms of service')}
                            component={renderCheckbox} validate={[required]} type="checkbox" />
                    </div>
                    <div className="col-md-12">
                        <fieldset>
                            <button type="submit" id="form-submit" className="button star-add-button">
                                Register
                            </button>
                        </fieldset>
                    </div>

                </div>

            </form>
        )

    }
}

const StarRegisterReduxForm = reduxForm({ form: 'register-star' })(StarRegisterForm)

class StarRegister extends Component {

    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.getStarCategory()
    }

    onSubmit = async (formData) => {
        const { token } = this.props.match.params
        const { name, surname, email, phone, price, cat_id, password } = formData
        await this.props.registerStar(name, surname, email, phone, price, cat_id, password, token)
        // const token = JSON.parse(localStorage.getItem("token"))
    }
    render() {
        const { t, getStarCategory, category } = this.props

        return (
            <Wrapper>
                <section className="star-register">
                    <div className="container">
                        <div className="section-heading section-heading-profile section-heading-more">
                            <h2>Registration</h2>
                            <div className="line-dec"></div>
                        </div>
                        <div className="row">
                            <div className="star-content">
                                <div className="container">
                                    <StarRegisterReduxForm onSubmit={this.onSubmit} t={this.props.t} getStarCategory={getStarCategory} category={category} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Wrapper>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        category: state.category.category,

    }
}

export default compose(connect(mapStateToProps, { getStarCategory, registerStar }), withRouter, withTranslation())(StarRegister);