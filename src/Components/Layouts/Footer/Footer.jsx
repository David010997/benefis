import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ScrollUpButton from "react-scroll-up-button";
import Armenia from '../../../assets/images/Armenia.png';
import i18next from 'i18next';
import usa from '../../../assets/images/usa.jpg'
import russia from '../../../assets/images/russia.png'
import { withTranslation } from 'react-i18next';
import './Footer.scss';
import AnchorLink from "react-anchor-link-smooth-scroll";
import Modal from 'react-modal';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { verifyStar } from '../../../redux/star-reducer';
import { required, email } from '../../../utils/validate'
import { RenderFieldForStarRegister } from '../../FormControls/FormControls';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('body');
let subtitle;

class RegisterStarForm extends Component {
    render() {
        const { verifyResponse } = this.props
        return (
            <>
                {verifyResponse && verifyResponse.success ?
                    <p className="text-success verify-success">{verifyResponse.message}</p>
                    : <form onSubmit={this.props.handleSubmit}>

                        <div className="col-md-12">
                            <fieldset>
                                <Field
                                    validate={[required, email]}
                                    component={RenderFieldForStarRegister}
                                    name="email"
                                    type="email"
                                    className="form-control form-control-verify"
                                    id="subject"
                                    label="email..."

                                />
                            </fieldset>
                        </div>
                        <div className="col-md-12">
                            <fieldset>
                                <Field
                                    validate={[required]}
                                    component={RenderFieldForStarRegister}
                                    name="password"
                                    type="password"
                                    className="form-control form-control-verify verify-pass"
                                    id="subject"
                                    label="password..."

                                />
                            </fieldset>
                        </div>
                        <div className="col-md-12">
                            <fieldset className="verify-button-field">
                                <button type="submit" id="form-submit" className="button verify-button">
                                    Send Message
                                </button>
                            </fieldset>

                        </div>
                        <p className="text-danger verify-error">{verifyResponse && verifyResponse.message}</p>
                    </form>
                }
            </>
        )
    }
}

const RegisterStarReduxForm = reduxForm({ form: "verify-star" })(RegisterStarForm)


class Footer extends Component {
    state = {
        backTotop: false,
        modalIsOpen: false
    }
    openModal = () => {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen,
            notification: false
        })
    }

    afterOpenModal = () => {
        subtitle.style.color = '#f00';
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false })
    }
    handleClick = (lang) => {
        i18next.changeLanguage(lang)
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        document.addEventListener('scroll', this.handleScroll);
        // var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        // (function () {
        //     const s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
        //     s1.async = true;
        //     s1.src = 'https://embed.tawk.to/5f11bf51a45e787d128ba1f4/default';
        //     s1.charset = 'UTF-8';
        //     s1.setAttribute('crossorigin', '*');
        //     s0.parentNode.insertBefore(s1, s0);
        // })();

    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        document.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        if (window.pageYOffset > 50) {
            this.setState({ stickyHeader: true, backTotop: true })
        } else {
            this.setState({ stickyHeader: false, backTotop: false })
        }
    }
    onSubmit = (formData) => {
        const { email, password } = formData;
        this.props.verifyStar('registration', email, password)
    }


    render() {
        const { backTotop } = this.state
        const { t, verifyStar, verifyResponse } = this.props
        return (
            <>
                <footer>
                    <div className="footerArea sectionBg">
                        <div className="container-fluid">
                            <div className="footerTop footerPadding">
                                <div className="row d-flex justify-content-between">
                                    <div className="col-xl-4 col-lg-4 col-md-3 col-6 full-width align-center">
                                        <div className="singleFooterCaption">
                                            <div className="footerLogo">
                                                <Link to="/">Benefis</Link>
                                            </div>
                                            <div className="registerStarRespBtn" onClick={this.openModal}>
                                                <Link to="#">Register as a star</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="registerStarBtn col-xl-4 col-lg-4 col-md-4">
                                        <div className="singleFooterCaption justify-content-center d-flex">
                                            <div className="star-register-footer" onClick={this.openModal}>
                                                <Link to="#">Register as a star</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-5 col-6 align-center full-width justify-content-end">
                                        <ul className="footerMenu">
                                            <li>{t('footer.1')}</li>
                                            <li>{t('footer.2')}</li>
                                            <li>{t('footer.3')}</li>
                                            <li>{t('footer.4')}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="footerBottom">
                                <div className="row d-flex justify-content-between align-items-center">
                                    <div className="col-xl-9 col-lg-8 col-6 full-width">
                                        <div className="footerCopyRight">
                                            <p>
                                                Copyright © 2020 All rights reserved
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-4 col-6 full-width ">
                                        <div className="footerSocial">
                                            <a href="#"><i className="fa fa-facebook"></i></a>
                                            <a href="#"><i className="fa fa-instagram"></i></a>
                                            <a href="#"><i className="fa fa-vk"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
                {backTotop &&
                    <div id="back-to-top"><AnchorLink href="#root"><i className="fa fa-level-up" aria-hidden="true"></i>

                    </AnchorLink></div>}
                <div>
                    <Modal
                        className="verify-modal"
                        isOpen={this.state.modalIsOpen}
                        // onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <RegisterStarReduxForm onSubmit={this.onSubmit} verifyStar={verifyStar}
                            verifyResponse={verifyResponse} />
                        {/* <h2 ref={_subtitle => (subtitle = _subtitle)} className="lang-title">Languages</h2> */}

                    </Modal>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        verifyResponse: state.stars.verifyResponse
    }
}

export default compose(connect(mapStateToProps, { verifyStar }), withTranslation())(Footer)