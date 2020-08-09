import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { uploadVideo } from '../../redux/star-reducer';
import { connect } from 'react-redux';


const getDateBalance = (deadline) => {
    const diff = new Date(deadline) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}



class UserOrderView extends Component {
    render() {
        const { orders } = this.props;

        return (
            <section className="section my-services" id="section3">
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
                                {orders.sort(function(a, b) {
                                    if (a.done < b.done) {
                                        return 1
                                    } else {
                                        return -1
                                    }
                                }).map(order => {
                                    return (
                                        <tr key={order._id}>
                                            <th scope="row">{order.category}</th>
                                            <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                            <td>{new Date(order.deadline).toLocaleDateString()}</td>
                                            <td className="line-block">{order.done === 0 || order.done === 1 ? <div className="line-more"></div> : <span className="see-more">Download video</span>}</td>
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
           
            </section>
        )
    }
}
const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, { uploadVideo })(UserOrderView);