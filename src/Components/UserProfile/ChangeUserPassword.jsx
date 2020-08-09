import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { editUserData } from '../../redux/auth-reducer';
import { required,minLength,maxLength,passwordsMustMatch } from '../../utils/validate';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { RenderFieldForUserPass } from '../FormControls/FormControls';


class ChangeStarPasswordForm extends Component {

    render() {
        const { t } = this.props
        const maxLength15 = maxLength(3, 15);
        const minLength3 = minLength(3, 15);
        return (
            <form id="contact" onSubmit={this.props.handleSubmit}>

                <div className="row">
                    <div className="col-md-12">
                        <fieldset>
                            <Field
                                component={RenderFieldForUserPass}
                                validate={[required, maxLength15, minLength3]}
                                name="old_password"
                                type="password"
                                validate={[required]}
                                className="form-control"
                                id="subject"
                                label="Old Password..."
                            />
                        </fieldset>
                    </div>
                    <div className="col-md-12">
                        <fieldset>
                            <Field
                                validate={[required, maxLength15, minLength3]}
                                type="password"
                                component={RenderFieldForUserPass}
                                name="password"
                                type="text"
                                className="form-control"
                                id="subject"
                                label="New Password..."

                            />
                        </fieldset>
                    </div>
                    <div className="col-md-12">
                        <fieldset>
                            <Field
                                validate={[required,passwordsMustMatch]}
                                component={RenderFieldForUserPass}
                                name="confirm_password"
                                type="text"
                                className="form-control"
                                id="subject"
                                label="Confirm Password..."

                            />
                        </fieldset>
                    </div>


                    <div className="col-md-12">
                        <fieldset>
                            <button type="submit" id="form-submit" className="button edit-button">
                                Send Message
                    </button>
                        </fieldset>

                    </div>

                </div>

            </form>
        )
    }
}
const ChangeStarPasswordReduxForm = reduxForm({ form: 'change-password' })(ChangeStarPasswordForm)

class ChangeStarPassword extends Component {

    onSubmit = async (formData) => {
        const { old_password, password, confirm_password } = formData
        await this.props.editUserPassword(old_password, password, confirm_password)

        const { message, success } = this.props.pass
        if (success) {
            NotificationManager.success('Success message', message, 2000);
        }
        else {
            NotificationManager.error('Error message', message, 3000, () => {
                alert('callback')
            })
        }
    }

    render() {


        return (
            <>
                <NotificationContainer />
                <section className="section contact-me" id="section2">
                    <div className="container">
                        <div className="section-heading section-heading-profile">

                            <h2>Change password</h2>
                            <div className="line-dec"></div>

                        </div>
                        <div className="row">
                            <div className="right-content">
                                <div className="container">
                                    <ChangeStarPasswordReduxForm onSubmit={this.onSubmit} t={this.props.t} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        pass:state.auth.pass
    }
}

export default connect(mapStateToProps, { editUserData })(ChangeStarPassword);