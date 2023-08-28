import React from 'react'
import "./Details.scss"
import DetailsBanner from './detailsbanner/DetailsBanner';
import { useParams } from 'react-router-dom';
import useFetch from '../../Utils/useFetch';
import Cast from './cast/Cast';
import VideosSection from './videosection/VideoSection';
import Similar from './carousels/Similar';
import  Recommendation from "./carousels/Recommendation"
const Details = () => {
const param= useParams();
const {data,loading} = useFetch(`/${param.mediaType}/${param.id}/videos`);
const {data:credits,loading:creditsLoading}=useFetch(`/${param.mediaType}/${param.id}/credits`);
  return (
    <div>
      <DetailsBanner video ={data?.results[0]} crew={credits?.crew}/>
  <Cast data={credits?.cast} loading={creditsLoading}/>
  <VideosSection  data={data} loading={loading}/>
  <Similar mediaType={param.mediaType}  id={param.id}/>
  <Recommendation  mediaType={param.mediaType} id={param.id}/>
  
    </div>
  )
}

export default Details;