import axios from 'axios';

export default {
  getTvShowImages: async (tvShowId) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${tvShowId}/images?api_key=${process.env.TMDB_KEY}`
    );
    return response.data;
  },
  getTvShowCredits: async (tvShowId) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${tvShowId}/credits?api_key=${process.env.TMDB_KEY}`
    );
    return response.data;
  },
  getTvShowSimilar: async (tvShowId) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${tvShowId}/similar?api_key=${process.env.TMDB_KEY}`
    );
    return response.data;
  },
  getTvShowReviews: async (tvShowId) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${tvShowId}/reviews?api_key=${process.env.TMDB_KEY}`
    );
    return response.data;
  },
  getTvShow: async (tvShowId) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${process.env.TMDB_KEY}`
    );
    return response.data;
  },
  find: async (query) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&${query}`
    );
    return response.data;
  },
  findPopular: async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false`
    );
    return response.data;
  }


};
