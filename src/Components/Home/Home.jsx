import React, { Component } from 'react';
import Wrapper from '../Wrapper'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import aaa from "../../assets/images/aaa.jpg"
import hasky from "../../assets/images/hasky.jpg"
import { Link, withRouter } from 'react-router-dom';
import { getStarCategory } from '../../redux/category-reducer';
import { connect } from 'react-redux';
import { Lines } from 'react-preloaders';
import { getAllStarsDatas } from '../../redux/star-reducer';
import Utils from '../../utils/Utils';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';
import { Dropdown } from "react-bootstrap";
import HomeIntro from "./HomeIntro";
import './Home.css'

class Home extends Component {
    state = {
        star: [],
        stickyHeader: false
    }

    addFavStar = (star) => {

        const fav_star = {
            name: star && star.fullName && star.fullName,
            category: star.category && star.category.name,
            price: star && star.price,
            avatar: star && star.avatar,
            id: star && star._id,
            slug: star && star.slug,
        }
        let arr = JSON.parse(localStorage.getItem('fav-star')) ? JSON.parse(localStorage.getItem('fav-star')) : []
        if (arr && arr.some(a => a.id === star._id)) {
            arr = arr.filter(a => a.id !== star._id)
            this.setState({ star: arr })
            localStorage.setItem('fav-star', JSON.stringify(arr))
        } else {
            arr = [...arr, fav_star]
            this.setState({ star: arr })
            localStorage.setItem('fav-star', JSON.stringify(arr))
        }
    }

    componentDidMount() {
        this.props.getAllStarsDatas()
        this.props.getStarCategory()
    }

    render() {
        const token = JSON.parse(localStorage.getItem('token'))
        const star_local = JSON.parse(localStorage.getItem('fav-star'))
        const { t, category, stars } = this.props
        const lang = localStorage.getItem("i18nextLng")
        return (
            <div className="home">
                <Wrapper>
                    <HomeIntro />
                    <div id="find-stars" className="homePage">
                        <div className="container-fluid">

                            <div className="category-content">
                                <ul className="category-block">
                                    {category.map(c => {
                                        return <li className="category-list" key={c._id}>
                                            <Link to={`/categories/${c.slug}`} className="category-link">{c.name[lang]}</Link>
                                        </li>
                                    })
                                    }

                                </ul>
                            </div>

                            <div className="row">

                                {stars.map(star => {
                                    return (
                                        <div className="starCard col-md-3 col-6" key={star._id}>
                                            <div className="item">
                                                <Link to={`/star-page/${star.slug}`} className="team text-center">
                                                    <div className="img">
                                                        <img src={Utils.fileUrl(star.avatar)} alt="Avatar" />
                                                        <div className="hoverEffect"><span>See More</span></div>

                                                    </div>
                                                    <h2>{star.fullName[lang]}</h2>
                                                    <span className="position">{star.category.name[lang]}</span>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </Wrapper>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        category: state.category.category,
        isFetching: state.category.isFetching,
        stars: state.stars.stars
    }
}

export default compose(connect(mapStateToProps, { getStarCategory, getAllStarsDatas }), withTranslation())(Home);
