import React from 'react'
import { PureComponent } from 'react';
import Wrapper from '../Wrapper';
import { Link, withRouter } from 'react-router-dom';
import CategoriesForHeader from '../CategoriesForHeader';
import { connect } from 'react-redux';
import { searchStar,searchStarForAll} from '../../redux/star-reducer';
import Utils from '../../utils/Utils';
import { compose } from 'redux';
import Lines from 'react-preloaders/lib/Lines/Lines';
import "./SearchPage.scss"

class SearchPage extends PureComponent {
   state = {
      url: new URLSearchParams(this.props.location.search).get("name"),
      skip: 0,
      value:false
   }
   async componentDidMount () {    
     await this.state.url?this.props.searchStarForAll(this.state.url, 0):this.props.history.push('/')
     await this.props.searchStar(new URLSearchParams(this.props.location.search).get("name"))

   }
    componentDidUpdate (prevProps,prevState) {
       this.setState({ url: new URLSearchParams(this.props.location.search).get("name")})
      if(prevState.url!==this.state.url){ 
      this.props.searchStarForAll(this.state.url,0)
      }
      
   }
   loadMore = async () => {
      await this.setState({ skip: this.state.skip + 1 })
      const { url, skip } = this.state
      // this.props.searchStar( url, skip)
       this.props.searchStarForAll(url, skip)
   }
   sortBySlug=(value)=>{
      this.props.searchStarForAll(this.state.url,0,value)
  }
  
   render() {
      const lang = localStorage.getItem("i18nextLng")
      const { searchRes,searched,finish, count } = this.props;
      return (
         <>
            <Lines customLoading={this.props.isFetching} />
            <Wrapper val={this.state.value}>
           
               <main className="search-main">
                  <div className="container-fluid">
                  <h2 className="search-result-length">Search result <span>{count}</span></h2>
                        
                                    {/* <select onChange={(e)=>this.sortBySlug(e.target.value)}>
                                        <option value="price_asc">Price by Low</option>
                                        <option value="price_desc">Price by High</option>
                                        <option value="updatedAt_asc">Date by Old</option>
                                        <option value="updatedAt_desc">Date by New</option>
                                    </select> */}
                                    
                            </div>
                     <div className="row">
                           { searched.map(star => {
                              return <div className="starCard col-md-3 col-6" key={star._id}>
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
                          })}
                  </div>
                {searched.length<count&&<p className="load-more" onClick={this.loadMore}><a>Load More</a></p>}
               </main>
            </Wrapper>
         </>
      )
   }
}
const mapStateToProps = state => {
   return {
      searchRes: state.stars.searchRes,
      isFetching: state.stars.isFetching,
      searched: state.stars.searched,
      finish:state.stars.finish,
      count:state.stars.count   
   }
}

export default compose(connect(mapStateToProps, { searchStar,searchStarForAll}), withRouter)(SearchPage);