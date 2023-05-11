import moviesService from "./../services";
import logger from '../../utils/Winston';

export default (dependencies, analytics) => {

    const getMovieImages = async (request, response, next) => {
        //input
        const movieId = request.params.id;
        // Treatment
        const movieImages = await moviesService.getMovieImages(movieId, dependencies);
        //output
        analytics.track({
            event: 'Get Movie Images',
            userId: "request.body",
        });
        response.status(200).json(movieImages);
    };

    const getMovieCredits = async (request, response, next) => {
        //input
        const movieId = request.params.id;
        // Treatment
        const movieCredits = await moviesService.getMovieCredits(movieId, dependencies);
        //output
        analytics.track({
            event: 'Get Movie Credits',
            userId: "request.body",
        });
        response.status(200).json(movieCredits);
    };

    const getMovieSimilar = async (request, response, next) => {
        //input
        const movieId = request.params.id;
        // Treatment
        const movieSimilar = await moviesService.getMovieSimilar(movieId, dependencies);
        //output
        analytics.track({
            event: 'Get Similar Movies',
            userId: "request.body",
        });
        response.status(200).json(movieSimilar);
    };


    const getMovie = async (request, response, next) => {
        //input
        const movieId = request.params.id;
        // Treatment
        const movie = await moviesService.getMovie(movieId, dependencies);
        //output
        analytics.track({
            event: 'Get Movie By ID',
            userId: "request.body",
        });
        response.status(200).json(movie);
    };
    const find = async (request, response, next) => {
        //input
        const query = request.query;
        // Treatment
        const movies = await moviesService.find(query, dependencies);
        //output
        analytics.track({
            event: 'Get Movies',
            userId: "request.body",
        });
        response.status(200).json(movies);
    };
    const getUpcomingMovies = async (request, response, next) => {
        // Treatment
        const movies = await moviesService.getUpcomingMovies(dependencies);
        //output
        analytics.track({
            event: 'Get Upcoming Movies',
            userId: "request.body",
        });
        response.status(200).json(movies);
    };

    return {
        getMovie,
        find,
        getUpcomingMovies,
        getMovieCredits,
        getMovieImages,
        getMovieSimilar
    };
};
