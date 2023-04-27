import Genre from '../entities/Genre';

export default {
  registerGenre: async  (name, {genresRepository}) => {
    const genre = new Genre(undefined, name);
    return genresRepository.persist(genre);
  },
  getGenre: (genreId, {genresRepository}) => {
    return genresRepository.get(genreId);
  },
  find: ({genresRepository})=>{
    return genresRepository.find();
  }
};
