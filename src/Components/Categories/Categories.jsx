import React, {Component} from 'react';
import Wrapper from '../Wrapper'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import aaa from "../../assets/images/aaa.jpg"
import hasky from "../../assets/images/hasky.jpg"
import {Link, withRouter} from 'react-router-dom';
import {getStarCategory, getStarByCat, getSubByCat} from '../../redux/category-reducer';
import {connect} from 'react-redux';
import {Lines} from 'react-preloaders';
import {getAllStarsDatas} from '../../redux/star-reducer';
import Utils from '../../utils/Utils';
import {withTranslation} from 'react-i18next';
import {compose} from 'redux';
import {Dropdown} from "react-bootstrap";
import './Categories.scss'

class Home extends Component {
    state = {
        star: [],
        stickyHeader: false,
        categories: []
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
            this.setState({star: arr})
            localStorage.setItem('fav-star', JSON.stringify(arr))
        } else {
            arr = [...arr, fav_star]
            this.setState({star: arr})
            localStorage.setItem('fav-star', JSON.stringify(arr))
        }
    }
    getStarBySlug = (c) => {
        this.props.getStarByCat(c.slug)
    }

    componentDidMount() {
        window.scrollTo(0,0)
        const {slug} = this.props.match.params
        const {child} = this.props.match.params
        this.props.getStarByCat(child || slug)
        this.props.getSubByCat(slug).then(() => this.setState({categories: this.props.sub}))
        this.props.getStarCategory()
    }


    render() {
        const token = JSON.parse(localStorage.getItem('token'))
        const star_local = JSON.parse(localStorage.getItem('fav-star'))
        const {t, category, stars, sub} = this.props
        const {categories} = this.state
        const lang = localStorage.getItem("i18nextLng")
        const {slug, child} = this.props.match.params
        return (
            <div className="categories">
                <Wrapper>
                    <div className="CategoriesPage">
                        <div className="container-fluid">
                            <div className="category-content">
                                <ul className="category-block">
                                    {sub.map(c => {
                                        return <li
                                            className={c.slug === child ? "category-list-active" : "category-list"}
                                            key={c._id}>
                                            <Link onClick={() => this.getStarBySlug(c)}
                                                  to={`/categories/${slug}/${c.slug}`}
                                                  className="category-link">{c.name[lang]} </Link>
                                        </li>
                                    })
                                    }
                                </ul>
                            </div>
                            <div className="row">
                                {stars.length ? stars.map(star => {
                                    return (
                                        <div className="starCard col-sm-3" key={star._id}>
                                            <div className="item">
                                                <Link to={`/star-page/${star.slug}`} className="team text-center">
                                                    <div className="img">
                                                        <img src={Utils.fileUrl(star.avatar)} alt="Avatar"/>
                                                        <div className="hoverEffect"><a>See More</a></div>

                                                    </div>
                                                    <h2>{star.fullName[lang]}</h2>
                                                    <span
                                                        className="position">{star.category && star.category.name && star.category.name[lang]}</span>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                }) :<div className="no-star-block">
                                    <h3 className="no-star-title">Stars Not Found</h3>
                                    <h4><Link to="/">Find your favourite star here</Link></h4>
                                   </div> 
                                }
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
        stars: state.category.starByCat,
        sub: state.category.sub
    }
}

export default compose(connect(mapStateToProps, {
    getStarCategory,
    getStarByCat,
    getSubByCat
}), withRouter, withTranslation())(Home);
