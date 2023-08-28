import React, { useEffect, useState } from "react";
import ContentWrapper from "../../../Components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../Components/SwitchTabs/SwitchTabs";
import useFetch from "../../../Utils/useFetch";
import Carousel from "../../../Components/carousel/Carousel";

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");
  const { data, loading } = useFetch(`/${endpoint}/popular`);
  function ontabchange(tab) {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  }
  return (
    <div className="carouselSection"> 
      <ContentWrapper>
        <span className="carouselTitle">What's Popular</span>
        <SwitchTabs data={["Movies", "TV shows"]} ontabchange={ontabchange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  );
};

export default  Popular ;
