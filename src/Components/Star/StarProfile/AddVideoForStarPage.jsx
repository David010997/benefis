import React, { Component } from 'react';
import Utils from '../../../utils/Utils';

class MyVideoPage extends Component {

    render() {
        const { videos } = this.props;
        console.log(videos);
        return (
            <section className="section my-services" id="section3">
                <div className="container">
                    <div className="section-heading section-heading-video">
                        {/* <form>
               <label className="custom-video-upload">
                    <input type="file" className="star-video-upload"/>
                    <i className="fa fa-download star-video-download-icon" aria-hidden="true" /> 
                </label>
            </form> */}
                        <h2>My videos</h2>

                        <div className="line-dec"></div>
                    </div>
                    <div className="row">
                        {videos.map(video => {
                            return <div className="col-lg-4 col-md-6">
                                <div className="service-item">
                                    <video src={Utils.videoUrl(video.name)} controls />
                                </div>

                            </div>

                        })}



                    </div>
                </div>
            </section>
        )
    }
}
export default MyVideoPage;