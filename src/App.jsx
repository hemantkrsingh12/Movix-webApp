import { useState, useEffect } from "react";
import fetchDataFromApi from "./Utils/Api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/HomeSlice";
import Home from "./Pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./Pages/Details/Details";
import SearchResult from "./Pages/SearchResult/SearchResult";
import Explore from "./Pages/Explore/Explore";
import Pagenotfound from "./Pages/404/Pagenotfound";
import Header from "../src/Components/header/Header";
import Footer from "../src/Components/footer/Footer";
import Login from "./Pages/login/Login";
import { Signup } from "./Pages/login/Signup";
// import "./App.css";

function App() {
  const dispatch = useDispatch();
  
  const url = useSelector((state) => state.homeSlice.url);
  // console.log(url);

  useEffect(() => {
    fetApiConfig();
    genresCall();
  }, []);
  const fetApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res);
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promise = [];
    let endpoints = ["tv", "movie"];
    let allgener = {};
    endpoints.forEach((url) => {
      promise.push(fetchDataFromApi(`/genre/${url}/list`));
    });
    const data = await Promise.all(promise);
    console.log("aman is king", data);
    data.map(({ genres }) => {
      console.log("generes right now", typeof(genres));
       return genres.map((item) => (allgener[item.id] = item));
      // return (allgener[genres.id] = item);
    });
    console.log("allgener left now",typeof(allgener) )
    dispatch(getGenres(allgener));
  };
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
