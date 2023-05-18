import reviewsService from "./../services";
import accountService from "../../accounts/services";
import uniqid from 'uniqid';

export default (dependencies, analytics) => {

    const getMovieReview = async (request, response) => {
        //input
        const reviewId = request.params.id;
        // Treatment
        const review = await reviewsService.getMovieReview(reviewId, dependencies);
        //output
        const authHeader = request.headers.authorization;
        const accessToken = authHeader.split(" ")[1];
        const user = await accountService.verifyToken(accessToken, dependencies);
        analytics.track({
            event: 'Get Movie Review by ID',
            userId: user,
            properties: {
                review: reviewId
            }
        });
        let status = 0;
        if (review['code']) {
            status = 404;
        } else {
            status = 200;
        }
        response.status(status).json(review);
    };

    const getTVShowReview = async (request, response) => {
        //input
        const reviewId = request.params.id;
        // Treatment
        const review = await reviewsService.getTVShowReview(reviewId, dependencies);
        //output
        const authHeader = request.headers.authorization;
        const accessToken = authHeader.split(" ")[1];
        const user = await accountService.verifyToken(accessToken, dependencies);
        analytics.track({
            event: 'Get TV Show Review by ID',
            userId: user,
            properties: {
                review: reviewId
            }
        });
        let status = 0;
        if (review['code']) {
            status = 404;
        } else {
            status = 200;
        }
        response.status(status).json(review);
    };

    const addMovieReview = async (request, response) => {
        // Input
        const movieId = request.params.id;
        const { author, review } = request.body;
        // Treatment
        const movieReview = await reviewsService.addMovieReview(movieId, author, review, dependencies);
        // Output
        response.status(201).json(movieReview);
        return response.data;
    };

    const addTVShowReview = async (request, response) => {
        // Input
        const tvShowId = request.params.id;
        const { author, review } = request.body;
        // Treatment
        const tvShowReview = await reviewsService.addTVShowReview(tvShowId, author, review, dependencies);
        response.status(201).json(tvShowReview);
        return response.data;
    };

    return {
        getMovieReview,
        getTVShowReview,
        addMovieReview,
        addTVShowReview
    };
};
