import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Movie = ({ item}) => {
  const { user, likes, setLikes  } = UserAuth();
  const movieID = user?.email ? doc(db, "users", user.email) : null;
  const [like, setLike] = useState(false);

  useEffect(() => {
    if (likes?.[item.id] !== undefined) {
      setLike(likes[item.id]);
    } else {
      const fetchSavedMovies = async () => {
        if (movieID) {
          try {
            const docSnap = await getDoc(movieID);
            if (docSnap.exists()) {
              const savedMovies = docSnap.data().savedShows || [];
              const isLiked = savedMovies.some((movie) => movie.id === item.id);
              setLike(isLiked);
              setLikes((prev) => ({ ...prev, [item.id]: isLiked }));
            }
          } catch (error) {
            console.error("Error fetching liked movies:", error);
          }
        }
      };
      fetchSavedMovies();
    }
  }, [user, item.id, likes]);

  const toggleLike = async () => {
    if (!user?.email) {
      alert("Please log in to save a movie");
      return;
    }

    try {
      if (!like) {
        await updateDoc(movieID, {
          savedShows: arrayUnion({
            id: item.id,
            title: item.title,
            img: item.backdrop_path,
          }),
        });
      } else {
        await updateDoc(movieID, {
          savedShows: arrayRemove({
            id: item.id,
            title: item.title,
            img: item.backdrop_path,
          }),
        });
      }

      setLike(!like);
      setLikes((prev) => ({ ...prev, [item.id]: !like }));
    } catch (error) {
      console.error("Error updating liked movies:", error);
    }
  };

  return (
    <div className="w-[200px] sm:w-[240px] md:w-[260px] lg:w-[300px] inline-block cursor-pointer relative p-2">
      <div className="relative overflow-hidden w-full inline-block cursor-pointer p-2">
        <Link to={`/player/${item.id}`}>
          <motion.img
            whileHover={{ scale: 1.3 }}
            className="w-full h-full block"
            src={`https://image.tmdb.org/t/p/original${item?.backdrop_path}`}
            alt={item?.title}
          />
        </Link>
      </div>
      <div className="absolute bottom-4 left-0 right-0 text-white text-xs sm:text-sm md:text-md font-bold flex justify-center items-center p-1 truncate">
        {item?.title}
      </div>

      <p onClick={toggleLike} className="absolute top-4 left-4 cursor-pointer">
        {like ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-300" />}
      </p>
    </div>
  );
};

export default Movie;
