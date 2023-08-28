import React from 'react'
import "../ContentWrapper/ContentWrapper.scss"
const ContentWrapper = (props) => {
  // console.log("props list",props);
  return <div className="contentWrapper">
        {props.children}</div>
  
}

export default ContentWrapper