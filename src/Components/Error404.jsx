import React from 'react'
import Wrapper from './Wrapper';

const Error=(props)=>{
    return(
       <Wrapper>
           <main className="error-main">
               <div className="container-star">
                   <div className="error-block">
                       <p className="error-img">
                           ooops
                       </p>
                       <h2 className="error-title">404-page not found</h2>
                       <p className="error-des">the page you are looking for might have been removed <br/> had its name changed or is temporarily unavailable</p>
                   </div>
               </div>
           </main>
       </Wrapper>
    )
}
export default Error;