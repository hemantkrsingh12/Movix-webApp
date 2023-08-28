import React from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"
const Img = (props) => {
  return (
    <div>
        
    <LazyLoadImage
    className={props.className || ""}
    alt=""
    effect='blur'
    src={props.src}
    />
    
    </div>
  )
}

export default Img