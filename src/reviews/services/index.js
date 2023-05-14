import axios from 'axios';
import logger from '../../utils/Winston';

export default {
  getMovieReview: async (movieId) => {
    let response = "";
    try {
      response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${process.env.TMDB_KEY}`
      );
    } catch (err) {
      logger.error("Unable to get movie reviews for: " + movieId + " : " + err.code);

      return err.code;
    }
    return response.data;
  },

  getTVShowReview: async (tvShowId) => {
    let response = "";
    try {
      response = await axios.get(
        `https://api.themoviedb.org/3/tv/${tvShowId}/reviews?api_key=${process.env.TMDB_KEY}`
      );
    } catch (err) {
      logger.error("Unable to get tv show reviews for: " + tvShowId + " : " + err.code);

      return err.code;
    }
    return response.data;
  },

  setMovieReview: async (movieId) => {
    let response = movieId;

    return response.data;
  },
  setTVShowReview: async (movieId) => {
    let response = movieId;

    return response.data;
  },
};
