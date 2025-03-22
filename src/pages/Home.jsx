import React, { Suspense } from "react";
import Main from "../components/main";
// import Rows from "../components/Rows";
import requests from "../requests";
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar";
import back_arrow from "../assets/back_arrow_icon.png"

const Rows = React.lazy(()=>import("../components/Rows"));

const Home = () => {
  return (
    <div>
       <Navbar />
      <Main />
      <Suspense fallback={<img src={back_arrow} alt="loading..."/>}>
      <Rows rowID="2" title="Now Playing" fetchURL={requests.nowPlaying} />
      <Rows rowID="1" title="Upcoming" fetchURL={requests.Upcoming} />
      <Rows rowID="3" title="Top Rated" fetchURL={requests.TopRated} />
      <Rows rowID="4" title="Popular" fetchURL={requests.Popular} />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Home;
