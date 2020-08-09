import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';
import { uploadVideo } from '../../../redux/star-reducer';
import { connect } from 'react-redux';


const getDateBalance = (deadline) => {
    const diff = new Date(deadline) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

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


class OrderView extends Component {
    state = {
        modalIsOpen: false,
        modalId: ''
    }
    openModal = (id) => {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen,
            modalId: id
        })
    }

    afterOpenModal = () => {
        subtitle.style.color = '#f00';
    }

    closeModal = () => {
        this.setState({modalIsOpen: false})
    }
    uploadVideo = (e) => {
        this.props.uploadVideo(e.target.files[0],this.state.modalId)
    }

    render() {
        const {user} = this.props;
        user.orders.sortByImportance = function () {
            let sortByDone = this.sort(function (a, b) {
                if (a.done > b.done) {
                    return 1
                }
                if (a.done < b.done) {
                    return -1;
                }
                return 0;
            });
            return sortByDone.sort(function (a, b) {
                if (a.deadline > b.deadline) {
                    return 1;
                }
                if (a.deadline < b.deadline) {
                    return -1;
                }
                return 0;
            });
        }
        return (
            <section className="section my-services" id="section4">
                <div className="container">
                    <div className="section-heading section-heading-video">
                        <h2>Orders view</h2>
                        <div className="line-dec"></div>
                    </div>
                    <div className="row">

                        <table className="table table-dark">
                            <thead>
                            <tr>
                                <th scope="col">Category</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Deadline</th>
                                <th scope="col" className="line">
                                    <div></div>
                                </th>
                                <th scope="col">Success</th>

                            </tr>
                            </thead>
                            <tbody>
                            {user.orders.sortByImportance().map(order => {
                                return (
                                    <tr key={order._id}>
                                        <th scope="row">{order.category}</th>
                                        <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td>{new Date(order.deadline).toLocaleDateString()}</td>
                                <td className="line-block" onClick={() => this.openModal(order._id)}>{order.done===2||order.done===1? <div className="line-more"></div>:<span className="see-more">See More</span>}</td>
                                        <td>{order.done === 2 ? <span className='text-success'>Done</span>
                                                : (order.done === 1 ? <span className='text-warning'>Checking...</span>
                                                : (getDateBalance(order.deadline) < 2 ? <span className="text-danger">Less than 2 days</span>
                                                : <span className="text-warning">Active</span>))}
                                            
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div >
                    <Modal
                        className="order-modal"
                        isOpen={this.state.modalIsOpen && this.state.modalId}
                        // onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"

                    >
                        {/* <h2 ref={_subtitle => (subtitle = _subtitle)} className="lang-title">Languages</h2> */}
                        <form className="video-upload">
                            <label className="custom-video-upload">
                                Ներբեռնել տեսանյութ
                                <input type="file" className="star-video-upload" onChange={this.uploadVideo}/>
                                <i className="fa fa-download star-video-download-icon" aria-hidden="true"/>
                            </label>
                        </form>
                        <div className="order-content">
                            <h3>This video is for</h3>
                            <p>For me</p>
                        </div>
                        <div className="order-content">
                            <h3>what the video about</h3>
                            <p>birthday</p>
                        </div>
                        <div className="order-content">
                            <h3>Video description</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat veniam quam voluptas
                                aliquam, voluptatibus dignissimos, porro ducimus quod sequi eveniet soluta iusto,
                                deserunt maxime itaque. Reiciendis ducimus voluptatum recusandae velit.</p>
                        </div>
                    </Modal>
                </div>
            </section>
        )
    }
}
    const mapStateToProps = (state) => {
        return {

        }
    }
    
export default connect(mapStateToProps,{uploadVideo})(OrderView);