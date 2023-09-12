import PropTypes from "prop-types";
import Card from "../Cards/Card";
import styles from './SearchResults.module.css';
import { Suspense, useState, useEffect } from "react";
import Loader from "../Loader/Loader";

const SearchResults = ({ searchResults }) => {
  const [loadingDelay, setLoadingDelay] = useState(true);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setLoadingDelay(false);
    }, 3000); 

    return () => {
      clearTimeout(delayTimeout);
    };
  }, []);

  return (
    <div className={styles.gridResults}>
      <Suspense fallback={<Loader />}>
        {loadingDelay ? (
          <Loader />
        ) : (
          searchResults.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))
        )}
      </Suspense>
    </div>
  );
};

SearchResults.propTypes = {
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      popularity: PropTypes.number.isRequired,
      vote_average: PropTypes.number.isRequired,
      poster_path: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SearchResults;
