import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";
import styles from "./MovieDetails.module.css";
import Loader from "../Loader/Loader";
import Sidebar from "./../Sidebar/Sidebar";
import { BsCircleFill, BsStarFill, BsListUl, BsPlayFill } from "react-icons/bs";
import { IoTicket } from "react-icons/io5";
import { leftposter } from "../../assets";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoKey, setVideoKey] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await fetchMovieDetails(id);
        setMovieDetails(details);
        setLoading(false);

        // Find the trailer video key
        const trailerVideo = details.videos.results.find(
          (video) => video.type === "Trailer"
        );

        if (trailerVideo) {
          setVideoKey(trailerVideo.key);
        }
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handlePlayClick = () => {
    setVideoPlaying(true);
  };

  useEffect(() => {
    if (videoPlaying && videoKey) {
      const iframe = document.getElementById("youtube-iframe");
      if (iframe) {
        iframe.src = `https://www.youtube.com/embed/${videoKey}?autoplay=1`;
      }
    }
  }, [videoPlaying, videoKey]);

  if (loading) {
    return <Loader />;
  }

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
    <div className={styles.mainFlex}>
      <Sidebar />
      <div className={styles.movieDetails}>
        <div
          className={styles.relative}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})`, 
          }}
        >
          {videoKey && (
            <div className={styles.youtubeClass}>
              {!videoPlaying ? (
                <div className={styles.movieTrailer} onClick={handlePlayClick}>
                  <BsPlayFill />
                  <span aria-label="Watch Trailer">Watch Trailer</span>
                </div>
              ) : null}
              {videoPlaying && (
                <iframe
                  id="youtube-iframe"
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoKey}`}
                  title={movieDetails.videos.results[0].key}
                  allowFullScreen
                  className={styles.iframe}
                ></iframe>
              )}
            </div>
          )}
        </div>
        <div className={styles.movieMain}>
          <div className={styles.movieDetailsLeft}>
            <div className={styles.movieInfo}>
              <p data-testid="movie-title">{movieDetails.title}</p>
              <BsCircleFill />
              <p data-testid="movie-release-date">
                {toUTC(movieDetails.release_date)}
              </p>
              <BsCircleFill style={{ fontSize: 4 }} />
              <p data-testid="movie-certification">PG-13</p>
              <BsCircleFill style={{ fontSize: 4 }} />
              <p data-testid="movie-runtime">
                {Math.floor(movieDetails.runtime / 60)}h{" "}
                {movieDetails.runtime % 60}m
              </p>
              <p data-testid="movie-genres">
                {movieDetails.genres.slice(0, 1).map((genre) => genre.name)}
              </p>
              <p data-testid="movie-genres">
                {movieDetails.genres[1] && movieDetails.genres[1].name}
              </p>
            </div>
            <div className={styles.movieOverview}>
              <p data-testid="movie-overview">{movieDetails.overview}</p>
            </div>
            <div className={styles.moviePersons}>
              <p>
                <span>Directors:</span> <a href="">Joseph Kosinki</a>
              </p>
              <p>
                <span>Writers: </span>
                <a href="#"> Jim Cash</a>,<a href="#"> Jack Epps Jr</a>,
                <a href="#"> Peter Craig</a>
              </p>
              <p>
                <span>Stars: </span>
                <a href="#">Tom Cruise</a>,<a href="#"> Jennifer Connelly</a>,
                <a href="#"> Miles Teller</a>
              </p>
            </div>
            <div className={styles.movieRating}>
              <a href="#">Top rated movie #65</a>
              <select name="Awards" id="Awards">
                <option value="Awards 9 nominations">
                  Awards 9 nominations
                </option>
              </select>
            </div>
          </div>
          <div className={styles.movieDetailsRight}>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <div className={styles.leftRating}>
                <BsStarFill style={{ color: "#fece32" }} />
                <span aria-label="Movie Ratings">
                  {movieDetails.vote_average.toFixed(1)}
                </span>
                |
                <span>
                  {Math.floor(movieDetails.vote_count / 100)
                    .toString()
                    .padStart(3, "0")}
                  k
                </span>
              </div>
              <div className={styles.leftButtons}>
                <button>
                  <IoTicket />
                  <a href="#">See Showtimes</a>
                </button>
                <button>
                  <BsListUl />
                  <a href="#">More watch options</a>
                </button>
              </div>
              <div className={styles.leftPoster}>
                <img src={leftposter} alt="The Best Movies" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
