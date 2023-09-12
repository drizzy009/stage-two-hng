import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchResults from "../../components/SearchResults/SearchResults";
import { searchMovies } from "../../services/api";
import { handleApiError } from "../../utils/errorHandler";

const SearchResultsPage = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await searchMovies(query);
        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
        const errorMessage = handleApiError(error);
        setError(errorMessage);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <SearchResults searchResults={searchResults} />
    </div>
  );
};

export default SearchResultsPage;