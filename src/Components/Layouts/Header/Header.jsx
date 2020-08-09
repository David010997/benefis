import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {setRegisterToken, getUserData} from '../../../redux/auth-reducer';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {reduxForm} from 'redux-form';
import {searchStar, pushHistory, changeSlug} from '../../../redux/star-reducer';
import Utils from '../../../utils/Utils';
import i18next from 'i18next';
import {withTranslation} from 'react-i18next';
import Modal from 'react-modal';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import hy from '../../../assets/images/Armenia.png';
import en from '../../../assets/images/usa.jpg';
import ru from '../../../assets/images/russia.png';
import './Header.scss'

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

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: JSON.parse(localStorage.getItem("token")),
            logoutMenu: false,
            value: '',
            search: false,
            flag: false,
            globus: true,
            focused: false,
            modalIsOpen: false,
            stickyHeader: false,
            notification: false

        };
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        document.addEventListener('scroll', this.handleScroll);
        this.state.token && this.props.getUserData()
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        document.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        if (window.pageYOffset > 50) {
            this.setState({stickyHeader: true, backTotop: true})
        } else {
            this.setState({stickyHeader: false, backTotop: false})
        }
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({
                logoutMenu: false,
                search: false,
                notification: false
            })
        }
    }

    focusSearch = () => {
        this.setState({focused: true})
    }

    searchStar = async (e) => {
        await this.setState({value: e.target.value, search: e.target.value ? true : false});
        await this.props.searchStar(this.state.value ? this.state.value : undefined)
        this.setState({notification: false})
    };

    openLogoutMenu = () => {
        this.setState({
            logoutMenu: !this.state.logoutMenu,
            notification: false
        })
    };
    removeUser = () => {
        this.setState({
            token: localStorage.removeItem("token")
        });
        this.props.history.push("/")
    };
    handleClick = (lang) => {
        i18next.changeLanguage(lang);
        localStorage.setItem("lang", lang)
        this.setState({modalIsOpen: false})

    };
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
        this.setState({modalIsOpen: false})
    }
    openNotification = () => {
        this.setState({
            notification: !this.state.notification,
            logoutMenu: false
        })
    }

    render() {
        const {token, value, search, focused, notification, logoutMenu, stickyHeader} = this.state;
        const {user, searchStar, t} = this.props;
        let {searchRes} = this.props;
        const lang = localStorage.getItem("i18nextLng");
        return (
            <header>

                <div className="headerArea headerTransparent home-header align-items-center">
                    <div className={stickyHeader ? "stickyBar mainHeader headerSticky" : " mainHeader headerSticky"}>
                        <div className="container-fluid">
                            <div className="row justify-content-between">
                                <div
                                    className="left-menu col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6 d-flex align-items-center">
                                    <div className="logo">
                                        <Link to="/">Benefis</Link>
                                    </div>
                                </div>
                                <div className="right-menu col-xl-9 col-lg-9 col-md-9 col-sm-9" ref={this.setWrapperRef}
                                     onClick={this.handleClickOutside}>
                                    <div className="menu-main d-flex align-items-center justify-content-end">
                                        <div className="d-flex align-items-center header-right">
                                            {!token ?
                                                <div
                                                    className="header-right-btn f-right d-none d-flex align-items-center ">
                                                    <Link to="/register"
                                                          className="headerBtn header-btn">{t('auth-btn.1')}</Link>
                                                    <Link to="/login"
                                                          className="headerBtn header-btn">{t('auth-btn.2')}</Link>
                                                </div> :

                                                <>
                                                    <div className="user__data">
                                                        <div onClick={this.openLogoutMenu}>
                                                            <img src={Utils.fileUrl(user && user.avatar)} alt=""/>
                                                            <span>Hi, {user && user.name && user.name[lang]}</span>&nbsp;
                                                            <i className="fa fa-angle-down header__dropDown"
                                                               aria-hidden="true"></i>
                                                        </div>
                                                        {logoutMenu && <div className="dropDown__menu">
                                                            <ul className="dropDown__menu__block">
                                                                <li><Link
                                                                    to={user && user.role === "star" ? "/star-profile" : "/user-profile"}>account</Link>
                                                                </li>
                                                                <li><Link to="/favourite-star">favourite stars</Link>
                                                                </li>
                                                                <li><Link to="#">notifications</Link></li>
                                                                <li><Link to="#" onClick={this.removeUser}>logout</Link>
                                                                </li>
                                                            </ul>
                                                        </div>}
                                                    </div>
                                                    <div className="notifications" onClick={this.handleClickOutside}><i
                                                        className="fa fa-bell" aria-hidden="true"
                                                        onClick={this.openNotification}></i>

                                                    </div>
                                                </>
                                            }

                                            <div className="languages" onClick={this.openModal}><i
                                                className="fa fa-globe"
                                                aria-hidden="true"></i>
                                            </div>
                                            <div className="search-block">
                                                <form className="global-search-form" action="/search">
                                                    <input maxLength="30" name="name"
                                                           className={!focused ? "search-input" : "search-input focusedInput"}
                                                           type="text" placeholder="&#xF002;  Search Star..."
                                                           aria-label="Search" value={value}
                                                           onFocus={this.focusSearch}
                                                           onChange={this.searchStar} autoComplete="off"/>

                                                    {search &&
                                                    <div className="search-results" ref={this.setWrapperRef}>
                                                        <ul>
                                                            {searchRes && searchRes.length ? searchRes.slice(0, 5).map(star => {
                                                                    return (
                                                                        <li key={star._id} className="search-result-line">
                                                                            <img src={Utils.fileUrl(star.avatar)} alt=""/>
                                                                            <Link className="search-result-name"
                                                                                  to={`/star-page/${star.slug}`}>
                                                                                {star.fullName[lang]}
                                                                            </Link>
                                                                        </li>
                                                                    )
                                                                }) :
                                                                <li className="search-no-result">
                                                                    No Result <span>"{value}"</span>
                                                                </li>
                                                            }
                                                            {value && searchRes.length > 5 ?
                                                                <li className="search-result-all">
                                                                    <Link className="" to={`/search?name=${value}`}>
                                                                        {t('see all')}<span>"{value}"</span>
                                                                    </Link>
                                                                </li>
                                                                : undefined
                                                            }
                                                        </ul>
                                                    </div>}

                                                    {focused ? <span className="search-cancel fa fa-times"
                                                                     onClick={() => this.setState({
                                                                         focused: false,
                                                                         value: ''
                                                                     })}></span> : undefined}
                                                </form>

                                            </div>
                                            {notification && <div className="notification-content">
                                                <div className="notification-block">0 notifications</div>
                                            </div>}
                                        </div>
                                    </div>

                                </div>
                                <div className="responsive-menu col-sm-6 col-6">
                                    <div className="hamburger">
                                        <input type="checkbox"/>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lang-modal">
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        // onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        {/* <h2 ref={_subtitle => (subtitle = _subtitle)} className="lang-title">Languages</h2> */}
                        <ul className="lang-flag">
                            <li><img onClick={() => this.handleClick('en')} src={en} alt=""/></li>
                            <li><img onClick={() => this.handleClick('ru')} src={ru} alt=""/></li>
                            <li><img onClick={() => this.handleClick('hy')} src={hy} alt=""/></li>
                        </ul>
                    </Modal>
                </div>
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        searchRes: state.stars.searchRes,
        slug: state.stars.slug
    }
};
export default compose(connect(mapStateToProps, {
    getUserData,
    searchStar,
    changeSlug
}), withRouter, withTranslation())(Header)