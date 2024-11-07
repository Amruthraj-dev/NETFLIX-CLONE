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
  // nowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`,
  // Popular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  // TopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  // Upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,

  nowPlaying: "http://localhost:300/results",
  Popular: "http://localhost:400/results",
  TopRated: "http://localhost:500/results",
  Upcoming: "http://localhost:600/results",
};
export default requests;
