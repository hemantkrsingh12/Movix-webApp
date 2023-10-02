import React, { useEffect, useState } from "react";
import ContentWrapper from "../../../Components/ContentWrapper/ContentWrapper";
import SwitchTabs from "../../../Components/SwitchTabs/SwitchTabs";
import useFetch from "../../../Utils/useFetch";
import Carousel from "../../../Components/carousel/Carousel";

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");
  const { data, loading } = useFetch(`/trending/all/${endpoint}`);
  console.log( "hkhhk",data); 
  function ontabchange(tab) {
    setEndpoint(tab === "Day" ? "day" : "week");
  }
  return (
    <div className="carouselSection"> 
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Day", "Week"]} ontabchange={ontabchange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading}/>
    </div>
  );
};

export default Trending;
