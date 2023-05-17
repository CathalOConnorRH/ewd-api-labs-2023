import axios from 'axios';
import logger from '../../utils/Winston';
import TVShowReview from '../entities/TVShowReview';
import MovieReview from '../entities/MovieReview';

export default {
  getMovieReview: async (movieId, { movieReviewsRepository }) => {
    let response = "";
    try {
      response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${process.env.TMDB_KEY}`
      );
    } catch (err) {
      logger.error("Unable to get movie reviews for: " + movieId + " : " + err.code);

      return err.code;
    }
    let localReviews = await movieReviewsRepository.get(movieId);

    var obj = Object.assign(response.data.results, localReviews);
    response.data.results = obj;
    response.data.total_results = response.data.total_results + localReviews.length;

    return response.data;
  },

  getTVShowReview: async (tvShowId, { tvShowReviewsRepository }) => {
    let response = "";
    try {
      response = await axios.get(
        `https://api.themoviedb.org/3/tv/${tvShowId}/reviews?api_key=${process.env.TMDB_KEY}`
      );
    } catch (err) {
      logger.error("Unable to get tv show reviews for: " + tvShowId + " : " + err.code);

      return err.code;
    }
    let localReviews = await tvShowReviewsRepository.get(tvShowId);
    var obj = Object.assign({}, response.data.results, localReviews);
    response.data.results = obj;
    response.data.total_results = response.data.total_results + localReviews.length;

    return response.data;
  },

  addMovieReview: async (movieId, author, review, { movieReviewsRepository }) => {
    const movieReview = new MovieReview(undefined, movieId, author, review);

    return movieReviewsRepository.persist(movieReview);
  },
  addTVShowReview: async (tvShowId, author, review, { tvShowReviewsRepository }) => {
    const tvShowReview = new TVShowReview(undefined, tvShowId, author, review);
    return tvShowReviewsRepository.persist(tvShowReview);
  },
};
