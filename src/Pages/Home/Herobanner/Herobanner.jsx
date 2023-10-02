import React, { useEffect, useState } from "react";
import "./Herobanner.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../Utils/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../Components/LazyloadImages/Img";
import ContentWrapper from "../../../Components/ContentWrapper/ContentWrapper";

const Herobanner = () => {
  const [background , setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data, loading } = useFetch("/movie/upcoming");

  const url = useSelector((state) => state.homeSlice.url);

  useEffect(() => {
    console.log(data);
    const img =
      url.backdrop +
      data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(img);
    console.log(img);
  }, [data]);

  function handlesubmit(event) {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  }
  return (
    <div>
      <div className="herobanner">
        {!loading && (
          <div className="backdrop-img">
            <Img src={background} />
          </div>
        )}

        <ContentWrapper>
          <div className="heroBannerContet">
            <span className="title">Welcome.</span>
            <span className="subtitle">
              Millions of movies,Tv shows and people to disover..Explore now.
            </span>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or Tv show..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={handlesubmit}
              />
              <button>Search</button>
            </div>
          </div>
          <div className="opacity-layer">
            
          </div>
        </ContentWrapper>
      </div>
    </div>
  );
};

export default Herobanner;
