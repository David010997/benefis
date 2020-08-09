import React, { Component } from 'react'
import Wrapper from '../Wrapper';
import Utils from '../../utils/Utils';
import { MDBCloseIcon } from "mdbreact"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './FavouriteStarPage.scss'
class FavouriteStarPage extends Component {
    state = {
        flag: true,
        star: JSON.parse(localStorage.getItem('fav-star'))
    }
    deleteFavStar = (id) => {
        this.setState({ flag: !this.state.flag })
        this.state.flag && confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        let arr = JSON.parse(localStorage.getItem('fav-star')) && JSON.parse(localStorage.getItem('fav-star'))
                        if (arr && arr.some(i => i.id === id)) {
                            arr = arr.filter(i => i.id !== id)
                            localStorage.setItem('fav-star', JSON.stringify(arr))
                            this.setState({ star: JSON.parse(localStorage.getItem('fav-star')), flag: !this.state.flag })

                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => this.setState({ flag: !this.state.flag })
                }
            ]

        });

    }
    render() {
        const { star } = this.state
        const lang = localStorage.getItem("i18nextLng")
        return (
            <Wrapper>
                <main className="favourite-star-main">
                    <div className="container-fluid">
                        <h2 className={star && star.length ? "favourite-star-title" : "display-none"}>Favourite Star</h2>
                        {star && star.length ?
                            <div className="row">
                                {star && star.map(star => {
                                    return <div className="starCard col-md-3 col-6" key={star.id}>
                                        <div className="item">
                                            <Link to={`/star-page/${star.slug}`} className="team text-center">
                                                <div className="img">
                                                    <img src={Utils.fileUrl(star.avatar)} alt="Avatar" />
                                                    <div className="hoverEffect"><span>See More</span></div>

                                                </div>
                                                <h2>{star.name[lang]}</h2>
                                                <span className="position">{star.category[lang]}</span>
                                            </Link>
                                            <span className="close-icon" onClick={() => this.deleteFavStar(star.id)}>  <MDBCloseIcon /></span>
                                        </div>
                                    </div>
                                })} </div> : <>
                                <div className='fav-star-empty'>
                                    <p>You haven't Chosen a favourite star yet</p>
                                    <p><Link to="/">Find your favourite star here</Link></p>
                                </div></>}
                    </div>

                </main>
            </Wrapper>
        )
    }
}
export default FavouriteStarPage;