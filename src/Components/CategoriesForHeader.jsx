import React, { Component } from 'react';
import { getStarCategory} from '../redux/category-reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class CategoriesForHeader extends Component{
    componentDidMount(){
        this.props.getStarCategory()
       }
    render(){
        const lang = localStorage.getItem("i18nextLng")
        return(
            <div className="category-for-header">
                {this.props.category.map((c)=>{
                    return <Link key={c._id} to="#" className="star-categories"><span>{c.name[lang]}</span></Link>
                })}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        category: state.category.category,
}
}

export default connect(mapStateToProps, { getStarCategory })(CategoriesForHeader);