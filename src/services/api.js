import { handleApiError } from "../utils/errorHandler";

const API_KEY = "1aef3fe5661608b3f53ac9295e701e95";

export const fetchTopMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch top movies: ${response.status}`);
    }

    const data = await response.json();
    return data.results.slice(0, 10);
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,images`
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(`Unauthorized: ${response.status}`);
      } else {
        throw new Error(`Failed to fetch movie details: ${response.status}`);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    );

    if (!response.ok) {
      throw new Error(`Failed to search for movies: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};
