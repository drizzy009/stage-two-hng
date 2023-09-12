import { useEffect, useState } from "react";
import Card from "../Cards/Card";
import { fetchTopMovies } from "../../services/api";
import { handleApiError } from "../../utils/errorHandler";
import styles from "./MovieList.module.css";
import Loader from "../Loader/Loader";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topMovies = await fetchTopMovies();
        setMovies(topMovies);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(handleApiError(error));
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.movieList}>
      <div className={styles.featuredFlex}>
        <h2>Featured Movie</h2>
        <button><a href="/" role="button">See more</a></button>
      </div>

      {error ? (
        <div className={styles.error}>{error}</div>
      ) : loading ? (
        <Loader />
      ) : (
        <div className={styles.gridCards}>
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
