import React, { useEffect, useState } from "react";
import requests from "../requests";
import axios from "axios";

const Main = () => {
  const [movies, setmovies] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(requests.Popular);
        const result = await response.data;
        console.log(result);
        console.log(response.data.results);
        setmovies(result);
      } catch (e) {
        console.error(e, "error");
      }
    };
    fetchdata();
  }, []);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  const truncate = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <>
      <div className=" w-full h-[550px] text-white">
        <div className="w-full h-full">
          <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
            alt=""
          />

          <div className="absolute w-full top-[20%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-bold my-4">
              {movie?.title}
            </h1>
            <div className="my-4">
              <button className="border bg-gray-300 text-black border-gray-300 px-5 py-2">
                Play
              </button>
              <button className="border  text-white border-gray-300 px-5 py-2 ml-4">
                Watch Later
              </button>
            </div>
            <p className="text-gray-400 text-sm">
              Released : {movie?.release_date}
            </p>
            <p className="w-full md:max-w-[70%] lg: max-w-[50%] xl:max-w-[35%] text-gray-200">
              {truncate(movie?.overview, 150)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
