import React, { useEffect, useState, useRef } from "react";

const movies = [
  { id: 1, title: "Movie 1", image: "https://via.placeholder.com/300x450" },
  { id: 2, title: "Movie 2", image: "https://via.placeholder.com/300x450" },
  { id: 3, title: "Movie 3", image: "https://via.placeholder.com/300x450" },
  { id: 4, title: "Movie 4", image: "https://via.placeholder.com/300x450" },
  { id: 5, title: "Movie 5", image: "https://via.placeholder.com/300x450" },
];

const MovieCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay(); 
  }, []);

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); 
  };

  const stopAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: currentIndex * 320, 
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={carouselRef}
        className="flex transition-transform duration-500 ease-in-out"
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[300px] mx-2 bg-gray-800 rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-4 text-white text-center font-semibold">
              {movie.title}
            </div>
          </div>
        ))}
      </div>

     
      <div className="absolute inset-y-0 flex items-center justify-between w-full px-2">
        <button
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === 0 ? movies.length - 1 : prevIndex - 1
            )
          }
          className="bg-gray-900 text-white px-3 py-2 rounded-full opacity-75 hover:opacity-100"
        >
          ◀
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === movies.length - 1 ? 0 : prevIndex + 1
            )
          }
          className="bg-gray-900 text-white px-3 py-2 rounded-full opacity-75 hover:opacity-100"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default MovieCarousel;
