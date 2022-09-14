import logo from './logo.svg';
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';
import { useEffect, useState } from 'react';

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

function App() {
  const [searchMove, setSearchMove] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>MovieSearch</h1>

      <div className="search">
        <input
          value={searchMove}
          onChange={(e) => setSearchMove(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchMove)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
