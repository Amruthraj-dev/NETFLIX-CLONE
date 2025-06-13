import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import requests from "../requests";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { arrayUnion, arrayRemove, doc, updateDoc, getDoc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = UserAuth();
  const [savedMovieIds, setSavedMovieIds] = useState([]);

  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(requests.Popular);
        const result = response.data.results.filter(
          (movie) => movie.backdrop_path !== ""
        );
        setMovies(result);
      } catch (e) {
        console.error("Failed to fetch movies:", e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [movies]);

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    const fetchSavedMovies = async () => {
      if (user?.email) {
        const docRef = doc(db, "users", user.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const saved = docSnap.data()?.savedShows || [];
          const ids = saved.map((movie) => movie.id);
          setSavedMovieIds(ids);
        }
      }
    };
    fetchSavedMovies();
  }, [user]);

  const toggleSaveMovie = async (movie) => {
    if (!user?.email) {
      alert("Please log in to save movies");
      return;
    }

    const movieRef = doc(db, "users", user.email);
    const movieData = {
      id: movie.id,
      title: movie.title,
      img: movie.backdrop_path,
    };

    let updatedIds;

    if (savedMovieIds.includes(movie.id)) {
      await updateDoc(movieRef, {
        savedShows: arrayRemove(movieData),
      });
      updatedIds = savedMovieIds.filter((id) => id !== movie.id);
    } else {
      await updateDoc(movieRef, {
        savedShows: arrayUnion(movieData),
      });
      updatedIds = [...savedMovieIds, movie.id];
    }

    setSavedMovieIds(updatedIds);
  };

  const truncate = (str, num) => {
    return str?.length > num ? str.slice(0, num) + "..." : str;
  };

  const movie = movies[currentIndex];

  return (
    <>
      <div
        ref={carouselRef}
        className="w-screen h-screen relative text-white overflow-hidden"
      >
        <div className="absolute w-full h-full bg-gradient-to-r from-black z-10"></div>
        <img
          className="w-full h-full object-cover absolute top-0 left-0"
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className="absolute z-20 w-full h-full flex flex-col justify-start mt-[50vh] px-4 md:px-8">
          <h1 className="text-3xl md:text-5xl font-bold my-4">
            {movie?.title}
          </h1>
          <p className="text-gray-300 text-sm mb-2">
            Released: {movie?.release_date}
          </p>
          <p className="hidden md:block md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {truncate(movie?.overview, 150)}
          </p>
          <div className="mt-6 flex gap-4">
            <Link to={`/player/${movie?.id}`}>
              <button className="bg-gray-300 text-black px-5 py-2 font-semibold">
                Play
              </button>
            </Link>
            <button
              onClick={() => toggleSaveMovie(movie)}
              className={`px-5 py-2 font-semibold border ${
                savedMovieIds.includes(movie?.id)
                  ? "text-white  border-gray-300"
                  : "text-white border-gray-300"
              }`}
            >
              {savedMovieIds.includes(movie?.id) ? "✔ Saved" : "Watch Later"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
