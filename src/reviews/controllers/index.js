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
        console.log("Created " + request.body);
        request.body.created_at = new Date();
        request.body.updated_at = new Date();
        request.body.id = uniqid();
        //reviewReviews.results.push(req.body); //push the new review onto the list
        response.status(201).json(request.body);
        return response.data;
    };

    const addTVShowReview = async (request, response) => {
        console.log("Created " + request.body);
        request.body.created_at = new Date();
        request.body.updated_at = new Date();
        request.body.id = uniqid();
        //reviewReviews.results.push(req.body); //push the new review onto the list
        response.status(201).json(request.body);
        return response.data;
    };

    return {
        getMovieReview,
        getTVShowReview,
        addMovieReview,
        addTVShowReview
    };
};
