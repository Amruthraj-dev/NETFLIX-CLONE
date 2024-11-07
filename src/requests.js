let key = "efc05e7cd7601ee69d0d20ca11d94462";

const accessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmMwNWU3Y2Q3NjAxZWU2OWQwZDIwY2ExMWQ5NDQ2MiIsIm5iZiI6MTcyMzQ2OTk3MS44NDQwMDQsInN1YiI6IjY2YmEwZjYwMzgyZmMzNGQ2NmFhZGIwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7GaR8DRW9igbwnJoQPShJzC_O1Qg3a9hzGsHlLTrVq8";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmMwNWU3Y2Q3NjAxZWU2OWQwZDIwY2ExMWQ5NDQ2MiIsIm5iZiI6MTcyMzQ3MDE2My4yMDI0MSwic3ViIjoiNjZiYTBmNjAzODJmYzM0ZDY2YWFkYjBhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.9w4RMuYWL4Zhax5PuWuAQZqhR27RSS2fC8wZ_KpKhKw",
  },
};

const requests = {
  nowPlaying: "https://netflix-api-collections.onrender.com/nowplaying",
  Popular: "https://netflix-api-collections.onrender.com/popular",
  TopRated: "https://netflix-api-collections.onrender.com/topRated",
  Upcoming: "https://netflix-api-collections.onrender.com/upcoming",
};
export default requests;
