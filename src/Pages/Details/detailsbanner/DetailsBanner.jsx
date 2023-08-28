import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "./DetailsBanner.scss";
import ContentWrapper from "../../../Components/contentWrapper/ContentWrapper";
import useFetch from "../../../Utils/useFetch";
import Genres from "../../../Components/Genres/Genres";
import CircleRating from "../../../Components/Circlerating/CircleRating";
import Img from "../../../Components/LazyloadImages/Img";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../Playbtn";
import VideoPopup from "../../../Components/videopopup/VideoPopup";
const DetailsBanner = (props) => {
  const paramter = useParams();
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { data, loading } = useFetch(`/${paramter.mediaType}/${paramter.id}`);
  const url = useSelector((state) => state.homeSlice.url);
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };
  const geners = data?.genres?.map((item) => item.id);
  const director = props.crew?.filter((item) => item.job === "Director");
  const writer = props.crew?.filter(
    (item) =>
      item.job === "Screenplay" || item.job === "Story" || item.job === "Writer"
  );
  const playbtnclick = () => {
    setShow(true);
    setVideoId(props.video.key);
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          <div className="backdrop-img">
            <Img src={url.backdrop + data?.backdrop_path} />
          </div>
          <div className="opacity-layer"></div>
          <ContentWrapper>
            <div className="content">
              <div className="left">
                {data?.poster_path ? (
                  <Img
                    className="posterImg"
                    src={url.backdrop + data?.poster_path}
                  />
                ) : (
                  <Img className="posterImg" src={PosterFallback} />
                )}
              </div>
              <div className="right">
                <div className="title">
                  {`${data?.name || data?.title} (${dayjs(
                    data?.release_date
                  ).format("YYYY")})`}
                </div>
                <div className="subtitle">{data?.tagline}</div>
                <Genres data={geners} />
                <div className="row">
                  <CircleRating rating={data?.vote_average?.toFixed(1)} />
                  <div className="playbtn" onClick={playbtnclick}>
                    <PlayIcon />
                    <span className="text">Watch Trailer</span>
                  </div>
                </div>
                <div className="overview">
                  <div className="heading">Overview</div>
                  <div className="description">{data?.overview}</div>
                </div>
                <div className="info">
                  <div className="infoItem">
                    <span className="text bold">Status:</span>
                    <span className="text">{data?.status}</span>
                  </div>
                  <div className="infoItem">
                    <span className="text bold">Release Date:</span>
                    <span className="text">
                      {dayjs(data?.release_date).format(" MMM D ,YYYY")}
                    </span>
                  </div>
                  <div className="infoItem">
                    <span className="text bold">Run time:</span>
                    <span className="text">
                      {toHoursAndMinutes(data?.runtime)}
                    </span>
                  </div>
                </div>
                {director?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Director: </span>
                    <span className="text">
                      {director.map((item, id) => {
                        return (
                          <span key={id}>
                            {item?.name}
                            {director.length - 1 !== id && " , "}
                          </span>
                        );
                      })}
                    </span>
                  </div>
                )}

                {writer?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Writer: </span>
                    <span className="text">
                      {writer?.map((item, id) => {
                        return (
                          <span key={id}>
                            {item?.name}
                            {writer?.length - 1 !== id && " , "}
                          </span>
                        );
                      })}
                    </span>
                  </div>
                )}

                {data?.created_by?.length > 0 && (
                  <div className="info">
                    <span className="text bold">Creator: </span>
                    <span className="text">
                      {data?.created_by?.map((item, id) => {
                        return (
                          <span key={id}>
                            {item?.name}
                            {data?.created_by?.length - 1 !== id && " , "}
                          </span>
                        );
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <VideoPopup
              show={show}
              setShow={setShow}
              videoId={videoId}
              setVideoId={setVideoId}
            />
          </ContentWrapper>
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
