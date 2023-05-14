import express from 'express';
import ReviewsController from '../controllers';
import AccountsController from '../../accounts/controllers';

const createReviewsRouter = (dependencies, analytics) => {
    const router = express.Router();
    // load controllers with dependencies
    const reviewsController = ReviewsController(dependencies, analytics);
    const accountsController = AccountsController(dependencies);

    //router.route('/*')
    //    .all(accountsController.verify);

    router.route('/movies/:id')
        .get(reviewsController.getMovieReview);

    router.route('/tvshows/:id')
        .get(reviewsController.getTVShowReview);

    router.route('/movies/:id')
        .post(reviewsController.addMovieReview);

    router.route('/tvshows/:id')
        .post(reviewsController.addMovieReview);

    return router;
};
export default createReviewsRouter;
