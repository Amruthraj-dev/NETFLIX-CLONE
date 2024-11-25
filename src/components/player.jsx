import React, { useEffect, useState } from "react";
import back_arrow from "../assets/back_arrow_icon.png";
import { useParams } from "react-router-dom";

const Player = () => {
  const [apiData, setapidata] = useState({
    published_at: "",
    name: "",
    key: "",
    typeof:""
  });

  const { id } = useParams();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmMwNWU3Y2Q3NjAxZWU2OWQwZDIwY2ExMWQ5NDQ2MiIsIm5iZiI6MTczMTk5NTA3Ny44NjY1MjUyLCJzdWIiOiI2NmJhMGY2MDM4MmZjMzRkNjZhYWRiMGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FF5kpDjeKErSDAQ2086I8OIxRgIaJI03nFZ8HyHQVxo",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => setapidata(res.results[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center ">
      <img className="absolute w-12 top-5 left-5 cursor-pointer" src={back_arrow} alt="back_arrow" />
      <iframe className="rounded-xl"
        src={`www.youtube.com/embeded/${apiData.key}`}
        title="trailer"
        allowFullScreen
        frameBorder={0}
      ></iframe>
      <div className="flex justify-between items-center w-6/12">
     
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
