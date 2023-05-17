import axios from 'axios';
import logger from '../../utils/Winston';

export default {
  getMovieImages: async (movieId) => {
    let response = "";
    try {
      response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${process.env.TMDB_KEY}`
      );
    } catch (err) {
      logger.error("Unable to get movie images for : " + movieId + " : " + err.code);
      return err.code;
    }
    return response.data;
  },
  getMovieCredits: async (movieId) => {
    let response = "";
    try {
      response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.TMDB_KEY}`
      );
    } catch (err) {
      logger.error("Unable to get movie credits for: " + movieId + " : " + err.code);
      return err.code;
    }
    return response.data;
  },
  getMovieSimilar: async (movieId) => {
    let response = "";
    try {
      response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.TMDB_KEY}`
      );
    } catch (err) {
      logger.error("Unable to get similar movies for: " + movieId + " : " + err.code);

      return err.code;
    }
    return response.data;
  },

  getMovieRecommendations: async (movieId) => {
    let response = "";
    try {
      response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.TMDB_KEY}`
      );
    } catch (err) {
      logger.error("Unable to get recommended movies for: " + movieId + " : " + err.code);

      return err.code;
    }
    return response.data;
  },

  getMovieReviews: async (movieId) => {
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

  setMovieReview: async (movieId) => {
    let response = movieId;

    return response.data;
  },

  getMovie: async (movieId) => {
    let response = "";
    try {
      response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_KEY}`
      );
    } catch (err) {
      logger.error("Unable to get movie: " + movieId + " : " + err.code);

      return err;
    }
    return response.data;
  },
  find: async (query) => {
    let response = "";
    try {
      response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&${query}`
      );
    } catch (err) {
      logger.error("Unable to get movies: " + err.code);

      return err.code;
    }
    return response.data;
  },
  findUpcoming: async () => {
    let response = "";
    try {
      response = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false`
      );
    } catch (err) {
      logger.error("Unable to get upcoming movies: " + err.code);

      return err;
    }
    return response.data;
  }


};
