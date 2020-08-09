import React, { Component, PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Wrapper from './Wrapper';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import CategoriesForHeader from './CategoriesForHeader';
import Modal from 'react-modal';
import ReactStars from 'react-stars'
import { connect } from 'react-redux';
import { getSingleStarData } from '../redux/star-reducer';
import { compose } from 'redux';
import Utils from '../utils/Utils';
import { getStarRating } from '../redux/rating-reducer';
import {withTranslation} from "react-i18next";

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
        }


        else {
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
        let { star,t } = this.props;
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

            <Wrapper >

                <CategoriesForHeader className="category-for-header" />
                <div className="main-star">

                    <div className="container-star ">
                        <section className="star-page">
                            <div className="video-block col-lg-4 col-md-4 col-sm-12">
                                <div className="star-gif">
                                    {star && star.videos ? <video controls>
                                        <source src={Utils.fileUrl(star && star.videos)} type="video/mp4" />
                                    </video> : <img src={Utils.fileUrl(star && star.avatar)} alt="avatar" />}
                                </div>
                            </div>
                            <div className="about-star col-lg-8 col-md-8 col-sm-12">
                                <p className="star-name">{star && star.fullName && star.fullName[lang]}</p>
                                <p className="star-status">{star && star.category_id}</p>
                                <p className="star-description">{star && star.description ? star.description : <>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero deleniti quis soluta quos quo perspiciatis dolore</>} </p>

                                <div className="reviews">

                                    <div className="reviews-stars">
                                        <ReactStars
                                            half={true}
                                            value={star.rating && star.rating.average === 0 ? 5 : star.rating && star.rating.average}
                                            className="star-rating"
                                            count={5}
                                            onChange={this.ratingChanged}
                                            size={36}
                                            color2={'#ffd700'} />
                                        <p className="reviews-count">{star.rating && star.rating.average === 0 ? 5.0: star.rating && star.rating.average.toFixed(1)}</p>
                                    </div>
                                    {/* <p> <Link to="#" onClick={this.openModal}>See all reviews</Link></p> */}
                                </div>
                                <Modal

                                    isOpen={this.state.modalIsOpen}
                                    onAfterOpen={this.afterOpenModal}
                                    onRequestClose={this.closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                >
                                    <div className="review-block">
                                        <h2 ref={_subtitle => (subtitle = _subtitle)} className="review-title">Hello</h2>
                                        <div>I am a modal I am a modal I am a modal I am a modal </div>

                                    </div>
                                </Modal>
                                <div className="starpage-buttons"> <Link to={`/book-star/${star && star.slug}`} className="request"><span className="request-des">{t('request') + ' ' + star.price} AMD</span></Link>
                                    {token && <Link to="#" onClick={() => this.addFavStar(fav_star)} > <FontAwesomeIcon className={star_local && star_local.some(s => s.id === star_id) ? "fav-star-heart-red" : "fav-star-heart-grey"} icon={faHeart} /></Link>} </div>
                            </div>

                            {/* <div className="advertise-block col-lg-3 col-md-2 col-sm-12">
                                <div className="starpage-advertise">
                                    <p className="advertise-text">Govazd</p>
                                </div>
                            </div> */}
                        </section>
                        <div className="starpage-bottom">
                            <p className="star-video-title">Latest videos</p>
                            <div className="star-videos">
                                <div className="star-gif">
                                    {star && star.videos ? star.videos.map(v => {
                                        return <video controls>
                                            <source src={Utils.fileUrl(v)} type="video/mp4" />
                                        </video>
                                    }) : <span>Videoner</span>}
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

            </Wrapper>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        star: state.stars.star,
        slug: state.stars.slug
    }
}

export default compose(connect(mapStateToProps, { getSingleStarData, getStarRating }), withRouter,withTranslation())(StarPage)