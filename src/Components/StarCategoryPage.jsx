import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Wrapper from './Wrapper';
import aaa from "../assets/images/aaa.jpg"
import hasky from "../assets/images/hasky.jpg"
import { LazyLoadImage,trackWindowScroll  } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import CategoriesForHeader from './CategoriesForHeader';

class StarCategoryPage extends Component{   
    render(){
        const category=this.props.match.params.starCategory
        return (
            <Wrapper>
                 <CategoriesForHeader />    
                <main className="star-category-main">
                <div className="container-star">
                  <p className="category-name">{category}</p>
                  <section className="star-photos-block">
               <LazyLoadImage className="star-photo"
                         alt="ааа"
                         scrollPosition={this.props.scrollPosition}
                        effect="blur"
                        height={400}
                         src={hasky} 
                        width={300} /> 
                  </section>
                  </div>
                </main>
                 
               
        </Wrapper>
        )
    }
}
 const starWithRouter=withRouter(StarCategoryPage)
export default withRouter(starWithRouter);