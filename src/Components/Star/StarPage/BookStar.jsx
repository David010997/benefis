import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { getSingleStarData } from '../../../redux/star-reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { RenderFieldForPayment, RenderFieldForTextarea, renderFieldRadio } from '../../FormControls/FormControls';
import { maxLength, minLength, required, email } from '../../../utils/validate';
import { setPayInfo } from '../../../redux/pay-reducer';
import { withTranslation } from 'react-i18next';

class BookStarForm extends Component {
    state = {
        radio: false,
        checked:true

    }
    render() {
        const { radio,checked } = this.state
        const { star, t } = this.props
        const maxLength300 = maxLength(3, 300)
        const maxLength15 = maxLength(3, 15)
        const minLength3 = minLength(3, 300)
        return (
            <form id="contact" onSubmit={this.props.handleSubmit}>
                <fieldset className="video-owner-radio">
                    <label onClick={() => this.setState({ radio: true,checked:false })}><Field name="forWhom" component={renderFieldRadio} type="radio" value="me" /> {t('book video.2')}</label>
                    <label onClick={() => this.setState({ radio: false,checked:true })}><Field name="forWhom" component={renderFieldRadio} type="radio" value="others" checked={checked} /> {t('book video.3')}</label>
                </fieldset>
                <div className="row">
                    {radio ? <div className="col-md-12">
                        <fieldset>
                            <Field
                                validate={[required]}
                                component={RenderFieldForPayment}
                                name="subject"
                                type="text"
                                className="form-control"
                                id="subject"
                                label="Your Name..."

                            />
                        </fieldset>
                    </div>: <>
                        <div className="col-md-6">
                            <fieldset>
                                <Field
                                    validate={[required]}
                                    component={RenderFieldForPayment}
                                    name="from"
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    label="from..."

                                />
                            </fieldset>
                        </div>
                        <div className="col-md-6">
                            <fieldset>
                                <Field
                                    validate={[required]}
                                    component={RenderFieldForPayment}
                                    name="to"
                                    type="text"
                                    className="form-control"
                                    label="to..."

                                />
                            </fieldset>

                        </div>
                    </>
                    
                    }

                    <div className="col-md-12">
                        <fieldset>
                            <Field
                                validate={[required]}
                                component={RenderFieldForPayment}
                                name="subject"
                                type="text"
                                className="form-control"
                                id="subject"
                                label="Subject..."

                            />
                        </fieldset>
                    </div>
                    <div className="col-md-12">
                        <fieldset>
                            <Field
                                validate={[required]}
                                maxLength="300"
                                minLength="3"
                                component={RenderFieldForTextarea}
                                name="description"
                                rows="6"
                                className="form-control"
                                id="message"
                                label="Your message..."

                            />
                        </fieldset>
                    </div>
                    <div className="col-md-12">
                        <fieldset className="payment-checkbox">
                            <label htmlFor="payment-checkbox" className="terms-label" id="payment-check-label">
                                <Field name="hide" id="payment-checkbox" className="terms-check " component="input" type="checkbox" />
                                <span className="terms-desc">{t("book video.8")}</span></label>
                        </fieldset>
                    </div>
                    <div className="col-md-12">
                        <fieldset>
                            <button type="submit" id="form-submit" className="button">
                                Send Message
                        </button>
                        </fieldset>

                    </div>

                </div>

            </form>
        )
    }
}
const BookStarReduxForm = reduxForm({ form: 'book-star' })(BookStarForm)
class BookStar extends Component {
    onSubmit = async (formData) => {
        await localStorage.setItem('event-des', JSON.stringify(formData))
        // this.props.history.push('/')
    }
    render() {
        const formValue = localStorage.getItem("event-des") ? JSON.parse(localStorage.getItem("event-des")) : {}
        const { forWhom, from, to, description, subject, hide } = formValue
        const initialValues = {
            forWhom,
            from,
            to,
            subject,
            description,
            hide
        }
        return (
            <section className="section contact-me" id="section3">
                <div className="container">
                    <div className="section-heading">
                        <h2>Book a video</h2>
                        <div className="line-dec"></div>

                    </div>
                    <div className="row">
                        <div className="right-content">
                            <div className="container">
                                <BookStarReduxForm onSubmit={this.onSubmit} t={this.props.t} initialValues={initialValues} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
const mapStateToProps = state => {
    return {
        star: state.stars.star,
        formData: state.pay.formData
    }
}
export default compose(connect(mapStateToProps, { getSingleStarData, setPayInfo }), withTranslation(), withRouter)(BookStar);