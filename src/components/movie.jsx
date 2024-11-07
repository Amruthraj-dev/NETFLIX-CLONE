import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";

const Movie = ({ item }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      if (item.id && item.title && item.backdrop_path) {
        await updateDoc(movieID, {
          savedShows: arrayUnion({
            id: item.id,
            title: item.title,
            img: item.backdrop_path,
          }),
        });
      } else {
        console.log("Error: Missing data in the item object.");
      }
    } else {
      alert("Please log in to save a movie");
    }
  };

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <motion.img
        whileHover={{ scale: 1.1 }}
        onHoverStart={(e) => {}}
        onHoverEnd={(e) => {}}
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/original${item?.backdrop_path}`}
        alt={item?.title}
      />
      {/* <div
        // whileHover={{ scale: 1.2 }}
        // onHoverStart={(e) => {}}
        // onHoverEnd={(e) => {}}
        className="absolute top-0 left-0 w-full h-full bg-black/80 opacity-0 hover:opacity-100 text-white"
      ></div> */}
      <p className="text-xs md:text-sm font-bold flex justify-center items-center absolute bottom-4 left-0 right-0 text-center text-white">
        {item?.title}
      </p>
      <p onClick={saveShow}>
        {like ? (
          <FaHeart className="absolute top-4 left-4 text-gray-300" />
        ) : (
          <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
        )}
      </p>
    </div>
  );
};

export default Movie;
