import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";

const SavedShows = () => {
  const [movies, setMovies] = useState([]);

  const { user } = UserAuth();

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  useEffect(() => {
    if (user?.email) {
      const unsub = onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
        setMovies(doc.data()?.savedShows || []);
      });
      return () => unsub(); // Cleanup the listener when component unmounts
    }
  }, [user?.email]);

  const movieRef = doc(db, "users", `${user?.email}`);
  const deleteShow = async (passedID) => {
    try {
      const result = movies.filter((item) => item.id !== passedID);
      await updateDoc(movieRef, { savedShows: result });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>

      <div className="relative flex items-center group">
        <MdChevronLeft
          size={40}
          onClick={slideLeft}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />

        <div
          id={"slider"}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies?.map((item, id) => (
            <div
              key={id}
              className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
            >
              <div className="relative overflow-hidden w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer p-2">
                <motion.img
                  whileHover={{ scale: 1.4 }}
                  onHoverStart={(e) => {}}
                  onHoverEnd={(e) => {}}
                  className="w-full h-auto block"
                  src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                  alt={item?.title}
                />
              </div>

              {/* Title is positioned at the bottom of the image and is always visible */}
              <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center absolute bottom-0 left-0 right-0 text-center text-white bg-black/70">
                {item?.title}
              </p>

              <p
                onClick={() => deleteShow(item.id)}
                className="absolute text-gray-300 top-4 right-4"
              >
                <AiOutlineClose />
              </p>
            </div>
          ))}
        </div>
        <MdChevronRight
          size={40}
          onClick={slideRight}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
        />
      </div>
    </>
  );
};

export default SavedShows;
