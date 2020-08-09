import React, { Component } from 'react'
import Wrapper from '../Wrapper';
import UserProfileMain from './UserProfileMain';
import { Link } from 'react-router-dom';
import UserOrderView from './UserOrderView'
import ChangeUserPassword from './ChangeUserPassword';
import { useState } from 'react';
import { connect } from 'react-redux';
import { getUserData, editUserAvatar } from '../../redux/auth-reducer';
import { getSingleStarData } from '../../redux/star-reducer';
import Utils from '../../utils/Utils';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import AnchorLink from "react-anchor-link-smooth-scroll";
import "../Star/StarPage/StarPage.scss"
class StarProfile extends Component {
  state = {
    starData: true,
    addVideo: false,
    changePass: false
  }
  componentDidMount() {
    window.scrollTo(0,0)
    const star = this.props.match.params.star
    this.props.getSingleStarData(star)
  }
  getStarData = () => {
    this.setState({
      starData: true,
      addVideo: false,
      changePass: false
    })
  }
  addVideo = () => {
    this.setState({
      starData: false,
      addVideo: true,
      changePass: false
    })
  }
  changePass = () => {
    this.setState({
      starData: false,
      addVideo: false,
      changePass: true
    })
  }
  handleChange = async (e) => {
    await this.props.editUserAvatar(e.target.files[0])
    const { uploadError } = this.props
    this.props.getUserData()
    uploadError && NotificationManager.error('Error message', uploadError, 3000, () => {
      alert('callback')
    })


  }

  render() {
    const { starData, addVideo, changePass } = this.state
    const { avatar } = this.props.user
    const { user } = this.props
    const lang = localStorage.getItem("i18nextLng");
    

    return (
      <div className="starPage">
        <Wrapper>
          <NotificationContainer className="edit-notify" />
          <div id="page-wraper">
            <div className="responsive-nav">
              <i className="fa fa-bars" id="menu-toggle"></i>
              <div id="menu" className="menu">
                <i className="fa fa-times" id="menu-close"></i>
                <div className="container">
                  <div className="image">
                    <div className="img"><img  src={Utils.fileUrl(avatar)} alt="" />
                    <form>
                    <label className="custom-image-upload">
                      <input type="file" className="star-image-upload" name="file-upload" onChange={this.handleChange} />
                              Upload Image
                            </label>
                  </form>
                  </div>
              
                  </div>
                  <div className="author-content">
                    <p className="edit-star-name">{user.fullName && user.fullName[lang]}</p>
                  </div>
                  <nav className="main-nav" role="navigation">
                    <ul className="main-menu">
                      <li><AnchorLink href="#section1">Main Information</AnchorLink></li>
                      <li><AnchorLink href="#section2">Change Password</AnchorLink></li>
                      <li><AnchorLink href="#section3">My orders</AnchorLink></li>
                      {/* <li><AnchorLink href="#section3">Add a video</AnchorLink></li> */}
                    </ul>
                  </nav>
                  {/* <div className="social-network">
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
                  </div> */}
                </div>
              </div>
            </div>

            <UserProfileMain />
             <ChangeUserPassword />
             <UserOrderView orders={user.my_orders}/>  
          </div>
        </Wrapper>
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    uploadError: state.auth.uploadError,
  }
}
export default connect(mapStateToProps, {  editUserAvatar, getSingleStarData,getUserData })(StarProfile);