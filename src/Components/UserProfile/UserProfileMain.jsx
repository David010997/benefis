import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { RenderFieldForStarVal } from '../FormControls/FormControls';
import { required, maxLength, email, minLength, minLength3, maxLength15 } from '../../utils/validate';
import { connect } from 'react-redux';
import { editUserData, getUserData } from '../../redux/auth-reducer';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class UserProfileMainForm extends Component {

    render() {

        return (
            <form id="contact" onSubmit={this.props.handleSubmit}>

                <div className="row">
                    <div className=" col-md-12">
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

const UserProfileMainReduxForm = reduxForm({ form: 'user-profile' })(UserProfileMainForm)

class UserProfileMain extends Component {
    onSubmit = async (formData) => {
        const { name, email, phone } = formData
        await this.props.editUserData(name, email, phone)
        await this.props.getUserData()
        const { message, success } = this.props.res
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
        const { user, setUserEditData } = this.props
        const initialValues = {
            name: user.name.en,
            email: user.email,

        }
        return (
            <>
                <NotificationContainer />
                <section className="section contact-me" id="section1">
                    <div className="container">
                        <div className="section-heading section-heading-profile">
                            <h2>Edit Profile</h2>
                            <div className="line-dec"></div>

                        </div>
                        <div className="row">
                            <div className="right-content">
                                <div className="container">
                                    <UserProfileMainReduxForm onSubmit={this.onSubmit} t={this.props.t} initialValues={initialValues} getUserData={this.props.getUserData} user={user} />
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
        data: state.auth.data,
        res: state.auth.res,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { editUserData, getUserData })(UserProfileMain);