import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";
import styles from "./MovieDetails.module.css";
import Loader from "../Loader/Loader";
import Sidebar from "./../Sidebar/Sidebar";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await fetchMovieDetails(id);
        setMovieDetails(details);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!movieDetails) {
    return <p>Movie details not found.</p>;
  }

  return (
    <div className={styles.mainFlex}>
      <Sidebar />
      <div
        style={{ display: "flex", flexDirection: "column", paddingRight: 30 }}
      >
        <div
          className={styles.relative}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path})`,
          }}
        >
          ggggghggggg
        </div>
        <div>
          {/* <img
          src={`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`}
          alt=""
        /> */}
          <h1 data-testid="movie-title">{movieDetails.title}</h1>
          <a href={movieDetails.homepage}></a>
          <p data-testid="movie-release-date">
            {movieDetails.release_date.substring(0, 4)}
          </p>
          <p data-testid="movie-runtime">
            {Math.floor(movieDetails.runtime / 60)} hours{" "}
            {movieDetails.runtime % 60} minutes
          </p>
          <p data-testid="movie-certification">PG-13</p>
          <p data-testid="movie-genres">
            {movieDetails.genres.slice(0, 2).map((genre) => genre.name)}
          </p>
          <p data-testid="movie-overview">{movieDetails.overview}</p>
        </div>
        <div>
          <p>
            <span>Directors:</span> <a href="">Joseph Kosinki</a>
          </p>
          <p>
            <span>Writers:</span> <a href="">Joseph Kosinki</a>
          </p>
          <p>
            <span>Stars:</span> <a href="">Tom Cruise</a>,
            <a href="3">Jennifer Connelly</a>, <a href="#">Miles Teller</a>
          </p>
        </div>
        <div>
          <a href="#">Top rated movie #65</a>
          <select name="" id="">
            <option value="Awards 9 nominations">Awards 9 nominations</option>
          </select>
        </div>
      </div>

      {/* {movieDetails.videos.results.length > 0 && (
      <div>
        <h2>Trailer:</h2>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${movieDetails.videos.results[0].key}`}
          title={movieDetails.videos.results[0].name}
          frameBorder="0"
          allowFullScreen
          className={styles.iframe}
        ></iframe>
      </div>
    )} */}
    </div>
  );
};

export default MovieDetails;
