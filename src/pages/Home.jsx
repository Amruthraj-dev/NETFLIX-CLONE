import React from "react";
import Main from "../components/main";
import Rows from "../components/Rows";
import requests from "../requests";
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar";

const Home = () => {
  return (
    <div>
       <Navbar />
      <Main />
      <Rows rowID="2" title="Now Playing" fetchURL={requests.nowPlaying} />
      <Rows rowID="1" title="Upcoming" fetchURL={requests.Upcoming} />
      <Rows rowID="3" title="Top Rated" fetchURL={requests.TopRated} />
      <Rows rowID="4" title="Popular" fetchURL={requests.Popular} />
      <Footer />
    </div>
  );
};

export default Home;
