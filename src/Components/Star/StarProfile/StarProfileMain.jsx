import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { editUserData, getUserData } from '../../../redux/auth-reducer';
import { RenderFieldForStarVal } from '../../FormControls/FormControls';
import { required, minLength, maxLength, email, minLength3, maxLength15 } from '../../../utils/validate';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class StarProfileMainForm extends Component {
    async componentDidMount() {
        await this.props.getUserData()
        const { name, surname, email, phone, price, social: { facebook, instagram } } = this.props.user
        this.setState({ name, surname, email, phone, price, facebook, instagram })
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    render() {
        const { t } = this.props
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
                            name="price"
                            type="text"
                            className="form-control"
                            id="subject"
                            label="price..."

                        />
                    </fieldset>
                </div>
                    <div className="col-md-6">
                        <fieldset>
                            <Field
                                validate={[required]}
                                component={RenderFieldForStarVal}
                                name="facebook"
                                type="text"
                                className="form-control"
                                id="name"
                                label="facebook..."

                            />
                        </fieldset>
                    </div>
                    <div className="col-md-6">
                        <fieldset>
                            <Field
                                validate={[required]}
                                component={RenderFieldForStarVal}
                                name="instagram"
                                type="text"
                                className="form-control"
                                label="instagram..."

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
const StarProfileMainReduxForm = reduxForm({ form: "star-data" })(StarProfileMainForm)

class StarProfileMain extends Component {
    componentDidMount () {
        this.props.getUserData()
    }
    onSubmit = async (formData) => {
        const { name, email, surname, price, facebook, instagram } = formData;
        await this.props.editUserData(name, email, surname, price, facebook, instagram)
        await this.props.getUserData()
        const { message, success } = this.props.res
        if (success) {
            NotificationManager.success('Success message', message, 3000);
        }
        else {
            NotificationManager.error('Error message', message, 3000, () => {
                alert('callback')
            })
        }
    }

    render() {

        const { user } = this.props
        const initialValues = {
            name: user.name.en,
            surname: user.surname.en,
            email: user.email,
            phone: user.phone,
            price: user.price,
            facebook: user.social.facebook,
            instagram: user.social.instagram
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
                                    <StarProfileMainReduxForm onSubmit={this.onSubmit} t={this.props.t} initialValues={initialValues} getUserData={this.props.getUserData} user={user}/>
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
        user: state.auth.user,
        res: state.auth.res
    }
}

export default connect(mapStateToProps, { editUserData, getUserData })(StarProfileMain);