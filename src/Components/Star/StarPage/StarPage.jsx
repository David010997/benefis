import React, { Component, PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Wrapper from '../../Wrapper';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import CategoriesForHeader from '../../CategoriesForHeader';
import Modal from 'react-modal';
import ReactStars from 'react-stars'
import { connect } from 'react-redux';
import { getSingleStarData } from '../../../redux/star-reducer';
import { compose } from 'redux';
import Utils from '../../../utils/Utils';
import { getStarRating } from '../../../redux/rating-reducer';
import { withTranslation } from "react-i18next";
import './StarPage.scss'
import AnchorLink from "react-anchor-link-smooth-scroll";
import BookStar from './BookStar';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('body');
let subtitle;

class StarPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            rating: 5,
            slug: this.props.match.params.star
        }

    }

    componentDidMount() {
        window.scrollTo(0, 0)
        const star = this.props.match.params.star
        this.props.getSingleStarData(star)
        // star_local.some(s=>s.id===star_id)
    }

    async componentDidUpdate(prevProps, prevState) {
        await this.setState({ slug: this.props.match.params.star })
        if (prevState.slug !== this.state.slug) {
            this.props.getSingleStarData(this.state.slug)
        }
    }

    ratingChanged = async (newRating) => {
        const slug = this.props.match.params.star
        await this.props.getStarRating(newRating, slug)
        this.props.getSingleStarData(slug)

    }
    addFavStar = (star) => {
        let arr = JSON.parse(localStorage.getItem('fav-star')) ? JSON.parse(localStorage.getItem('fav-star')) : []
        const lang = localStorage.getItem("i18nextLng")
        if (arr && arr.some(a => a.id === star.id)) {
            arr = arr.filter(a => a.id !== star.id)
            localStorage.setItem('fav-star', JSON.stringify(arr))
        } else {
            arr = [...arr, star]
            localStorage.setItem('fav-star', JSON.stringify(arr))
        }
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
    }

    openModal = () => {
        this.setState({
            modalIsOpen: true
        })
    }

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false })
    }


    render() {
        const token = JSON.parse(localStorage.getItem('token'))
        const star_local = JSON.parse(localStorage.getItem('fav-star'))
        const { rating } = this.state;
        let { star, t } = this.props;
        const star_id = star && star._id
        const lang = localStorage.getItem("i18nextLng")
        const fav_star = {
            name: star && star.fullName && star.fullName,
            category: star.category && star.category.name,
            price: star && star.price,
            avatar: star && star.avatar,
            id: star && star._id,
            slug: star && star.slug,
        }

        return (
            <div className="starPage">
                <Wrapper>
                    <div id="page-wraper">
                        <div className="responsive-nav">
                            <i className="fa fa-bars" id="menu-toggle"></i>
                            <div id="menu" className="menu">
                                <i className="fa fa-times" id="menu-close"></i>
                                <div className="container">
                                    <div className="image">
                                        <img src={Utils.fileUrl(star.avatar)} alt="" />
                                    </div>
                                    <div className="author-content">
                                        <h4>{star.fullName && star.fullName[lang]}</h4>
                                        <span>{star.category && star.category.name[lang]}</span>
                                    </div>
                                    <nav className="main-nav" role="navigation">
                                        <ul className="main-menu">
                                            <li><AnchorLink href="#section1">Main</AnchorLink></li>
                                            <li><AnchorLink href="#section2">Congratulations</AnchorLink></li>
                                            <li><AnchorLink href="#section3">Book a video</AnchorLink></li>
                                        </ul>
                                    </nav>
                                    <div className="social-network">
                                        <ul className="social-icons">
                                            <li>
                                                <a href=""><i className="fa fa-facebook"></i></a>
                                            </li>
                                            <li>
                                                <a href=""><i className="fa fa-twitter"></i></a>
                                            </li>
                                            <li>
                                                <a href="#"><i className="fa fa-linkedin"></i></a>
                                            </li>
                                            <li>
                                                <a href="#"><i className="fa fa-dribbble"></i></a>
                                            </li>
                                            <li>
                                                <a href="#"><i className="fa fa-rss"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <section className="section about-me" id="section1">
                            <div className="container">
                                <div className="section-heading">
                                    <p><span>{star.fullName && star.fullName[lang]}</span> is ready to congretulate you and your relatives</p>
                                    <div className="line-dec"></div>
                                </div>
                                <div className="left-image-post">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="left-image">
                                                <img src={Utils.fileUrl(star.avatar)} alt="" />
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="right-text">
                                                <h4>Reflux HTML CSS Template</h4>
                                                <p>
                                                    Donec tristique feugiat lacus, at sollicitudin nunc euismod
                                                    sed. Mauris viverra, erat non sagittis gravida, elit dui
                                                    mollis ante, sit amet eleifend purus ligula eget eros. Sed
                                                    tincidunt quam vitae neque pharetra dignissim eget ut
                                                    libero.
                                                </p>
                                                <div className="star-rating-block">
                                                    <ReactStars
                                                        half={true}
                                                        value={star.rating && star.rating.average === 0 ? 5 : star.rating && star.rating.average}
                                                        className="star-rating"
                                                        count={5}
                                                        onChange={this.ratingChanged}
                                                        size={32}
                                                        color2={'#ffd700'} />
                                                    <div className="rating-count">{star.rating && star.rating.average === 0 ? "5.0" : star.rating && star.rating.average.toFixed(1)}</div>

                                                </div>
                                            <div className="starpage-buttons">
                                            <div className="white-button">
                                                    <AnchorLink href="#section3">Request for {star.price}</AnchorLink>

                                                </div>
                                                <div className="like-icon"> {token && <Link to="#" onClick={() => this.addFavStar(fav_star)} > <FontAwesomeIcon className={star_local && star_local.some(s => s.id === star_id) ? "like-btn-active" : "like-btn-passive"} icon={faHeart} /></Link>}</div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="section my-services" id="section2">
                            <div className="container">
                                <div className="section-heading section-heading-video">
                                    <h2>Congratulations</h2>
                                    <div className="line-dec"></div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4 col-md-6">
                                        <div className="service-item">
                                            <div className="first-service-icon service-icon"></div>

                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="service-item">
                                            <div className="second-service-icon service-icon"></div>

                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="service-item">
                                            <div className="third-service-icon service-icon"></div>

                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="service-item">
                                            <div className="fourth-service-icon service-icon"></div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <BookStar />
                    </div>
                </Wrapper>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        star: state.stars.star,
        slug: state.stars.slug
    }
}

export default compose(connect(mapStateToProps, {
    getSingleStarData,
    getStarRating
}), withRouter, withTranslation())(StarPage)