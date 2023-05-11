import moviesService from "./../services";
import accountService from "../../accounts/services";

export default (dependencies, analytics) => {

    const getMovieImages = async (request, response, next) => {
        //input
        const movieId = request.params.id;
        // Treatment
        const movieImages = await moviesService.getMovieImages(movieId, dependencies);
        const authHeader = request.headers.authorization;
        const accessToken = authHeader.split(" ")[1];
        const user = await accountService.verifyToken(accessToken, dependencies);

        //output
        analytics.track({
            event: 'Get Movie Images',
            userId: user,
            properties: {
                movie: movieId
              }
        });

        response.status(200).json(movieImages);
    };

    const getMovieCredits = async (request, response, next) => {
        //input
        const movieId = request.params.id;
        // Treatment
        const movieCredits = await moviesService.getMovieCredits(movieId, dependencies);
        //output
        const authHeader = request.headers.authorization;
        const accessToken = authHeader.split(" ")[1];
        const user = await accountService.verifyToken(accessToken, dependencies);
        analytics.track({
            event: 'Get Movie Credits',
            userId: user,
            properties: {
                movie: movieId
              }
        });

        response.status(200).json(movieCredits);
    };

    const getMovieSimilar = async (request, response, next) => {
        //input
        const movieId = request.params.id;
        // Treatment
        const movieSimilar = await moviesService.getMovieSimilar(movieId, dependencies);
        //output
        const authHeader = request.headers.authorization;
        const accessToken = authHeader.split(" ")[1];
        const user = await accountService.verifyToken(accessToken, dependencies);
        analytics.track({
            event: 'Get Similar Movies',
            userId: user,
            properties: {
                movie: movieId
              }
        });

        response.status(200).json(movieSimilar);
    };


    const getMovie = async (request, response, next) => {
        //input
        const movieId = request.params.id;
        // Treatment
        const movie = await moviesService.getMovie(movieId, dependencies);
        //output
        const authHeader = request.headers.authorization;
        const accessToken = authHeader.split(" ")[1];
        const user = await accountService.verifyToken(accessToken, dependencies);
        analytics.track({
            event: 'Get Movie by ID',
            userId: user,
            properties: {
                movie: movieId
              }
        });

        response.status(200).json(movie);
    };
    const find = async (request, response, next) => {
        // #swagger.description = "Description here..."        
        //input
        const query = request.query;
        // Treatment
        const movies = await moviesService.find(query, dependencies);
        //output
        const authHeader = request.headers.authorization;
        const accessToken = authHeader.split(" ")[1];
        const user = await accountService.verifyToken(accessToken, dependencies);
        analytics.track({
            event: 'Get Movies',
            userId: user,
        });

        response.status(200).json(movies);
    };
    const getUpcomingMovies = async (request, response, next) => {
        // Treatment
        const movies = await moviesService.getUpcomingMovies(dependencies);
        //output
        const authHeader = request.headers.authorization;
        const accessToken = authHeader.split(" ")[1];
        const user = await accountService.verifyToken(accessToken, dependencies);
        analytics.track({
            event: 'Get Upcoming Movies',
            userId: user,
        });

        response.status(200).json(movies);
    };
    const getMovieReviews = async (request, response, next) => {
        //input
        const movieId = request.params.id;
        // Treatment
        const movies = await moviesService.getMovieReviews(movieId,dependencies);
        //output
        const authHeader = request.headers.authorization;
        const accessToken = authHeader.split(" ")[1];
        const user = await accountService.verifyToken(accessToken, dependencies);
        analytics.track({
            event: 'Get Movie Reviews',
            userId: user,
            properties: {
                movie: movieId
              }
        });

        response.status(200).json(movies);
    };

    return {
        getMovie,
        find,
        getUpcomingMovies,
        getMovieCredits,
        getMovieImages,
        getMovieSimilar,
        getMovieReviews
    };
};
