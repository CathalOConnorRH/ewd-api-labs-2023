import moviesService from "./../services";
import accountService from "../../accounts/services";
import uniqid from 'uniqid';

export default (dependencies, analytics) => {

    const getMovieImages = async (request, response) => {
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

        let status = 0;
        if (movieImages['code']) {
            status = 404;
        } else {
            status = 200;
        }
        response.status(status).json(movieImages);
    };

    const getMovieCredits = async (request, response) => {
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
        let status = 0;
        if (movieCredits['code']) {
            status = 404;
        } else {
            status = 200;
        }
        response.status(status).json(movieCredits);
    };

    const getMovieSimilar = async (request, response) => {
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

        let status = 0;
        if (movieSimilar['code']) {
            status = 404;
        } else {
            status = 200;
        }
        response.status(status).json(movieSimilar);
    };


    const getMovie = async (request, response) => {
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
        let status = 0;
        if (movie['code']) {
            status = 404;
        } else {
            status = 200;
        }
        response.status(status).json(movie);
    };
    const find = async (request, response) => {
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

        let status = 0;
        if (movies['code']) {
            status = 404;
        } else {
            status = 200;
        }
        response.status(status).json(movies);
    };
    const getUpcomingMovies = async (request, response) => {
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

        let status = 0;
        if (movies['code']) {
            status = 404;
        } else {
            status = 200;
        }
        response.status(status).json(movies);
    };
    const getMovieReviews = async (request, response) => {
        //input
        const movieId = request.params.id;
        // Treatment
        const movies = await moviesService.getMovieReviews(movieId, dependencies);
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

        let status = 0;
        if (movies['code']) {
            status = 404;
        } else {
            status = 200;
        }
        response.status(status).json(movies);
    };

    const setMovieReview = async (request, response) => {
        console.log("Created " + request.body);
        request.body.created_at = new Date();
        request.body.updated_at = new Date();
        request.body.id = uniqid();
        //movieReviews.results.push(req.body); //push the new review onto the list
        response.status(201).json(request.body);
        return response.data;
    };

    return {
        getMovie,
        find,
        getUpcomingMovies,
        getMovieCredits,
        getMovieImages,
        getMovieSimilar,
        getMovieReviews,
        setMovieReview
    };
};
