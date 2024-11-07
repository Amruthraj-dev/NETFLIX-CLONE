import React from "react";
import Main from "../components/main";
import Rows from "../components/Rows";
import requests from "../requests";
import NetflixFooter from "../components/footer/footer";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div>
      <Main />
      <Rows rowID="1" title="Upcoming" fetchURL={requests.Upcoming} />
      <Rows rowID="2" title="Now Playing" fetchURL={requests.nowPlaying} />
      <Rows rowID="3" title="Top Rated" fetchURL={requests.TopRated} />
      <Rows rowID="4" title="Popular" fetchURL={requests.Popular} />
      <NetflixFooter />
    </div>
  );
};

export default Home;
