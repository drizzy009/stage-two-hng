import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import { imdb, rt } from "../../assets";

const Card = ({ movie }) => {
  const toUTC = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div data-testid="movie-card" className={styles.flexBox}>
      <Link to={`/movies/${movie.id}`}>
        <img
          data-testid="movie-poster"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          width={250}
          height={370}
        />
        <span data-testid="movie-release-date">
          {toUTC(movie.release_date)}
        </span>
        <span data-testid="movie-title">{movie.title}</span>
        </Link>
        <div className={styles.rating}>
          <span data-testid="movie-ratings">
            <img src={imdb} alt={imdb} />
            {movie.vote_average}/100
          </span>
          <span data-testid="movie-ratings">
            <img src={rt} alt={rt} />
            {movie.vote_average * 10}%
          </span>
        </div>
    </div>
  );
};

export default Card;

Card.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    popularity: PropTypes.number,
    vote_average: PropTypes.number,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
  }).isRequired,
};
