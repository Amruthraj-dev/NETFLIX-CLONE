let key = "efc05e7cd7601ee69d0d20ca11d94462";

const accessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZmMwNWU3Y2Q3NjAxZWU2OWQwZDIwY2ExMWQ5NDQ2MiIsIm5iZiI6MTcyMzQ2OTY2NC40OTgsInN1YiI6IjY2YmEwZjYwMzgyZmMzNGQ2NmFhZGIwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cQ7ty4rMeyPy4U8-UWJJKUpGiwJiFb0K0zjrL-9ypwk";


const requests = {
  nowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1 `,
  Popular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1 `,
  TopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1 `,
  Upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1 `,
};
export default requests;
