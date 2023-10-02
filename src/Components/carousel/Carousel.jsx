import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import Img from "../LazyloadImages/Img";
import PosterFallback from "../../assets/no-poster.png";
import "./Carousel.scss";

const Carousel = ({ data, loading,endpoint,title}) => {
   
  const navigate = useNavigate();
  const carouselContainer = useRef(null);
  const url = useSelector((state) => state.homeSlice.url);
  function navigation(dir) {
    const container = carouselContainer.current;
    
    const scrollamout =
      dir === "left"
        ?container.scrollLeft  - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
      left: scrollamout,
      behavior: "smooth",
    });
  }

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data && data.length > 0 ? (
              data.map((item) => {
                const img = item.poster_path
                  ? url.poster + item.poster_path
                  : PosterFallback;
                return (
                  <div key={item.id} className="carouselItem" 
                  onClick={()=>{
                      navigate(`/${item.media_type|| endpoint}/${item.id}`)
                  }}>
                    <div className="posterBlock">
                      <Img src={img} />
                      <CircleRating rating={item.vote_average.toFixed(1)} />
                      <Genres data={item.genre_ids.slice(0,2)} />
                    </div>
                    <div className="textBlock">
                      <span className="title">{item.title || item.name}</span>
                      <span className="date">
                        {dayjs(item.release_date).format("MMM D , YYYY")}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <span>No data available.</span>
            )}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
