import "./App.css";
import { getMovieList, searchMovie } from "./api";
import { useEffect, useState } from "react";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  console.log("halo");

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="movie-wrapper" key={i}>
          <div className="movie-title">{movie.title}</div>
          <img
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
            alt="tes"
            className="movie-image"
          />
          <div className="movie-date">Release: {movie.release_date}</div>
          <div className="movie-rate">{movie.vote_average}</div>
        </div>
      );
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movies</h1>
        <input
          type="text"
          placeholder="Search movie..."
          className="movie-search"
          onChange={({ target }) => search(target.value)}
        />

        <div className="movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
};
export default App;
