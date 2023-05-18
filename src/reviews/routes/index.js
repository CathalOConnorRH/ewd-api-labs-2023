import express from 'express';
import ReviewsController from '../controllers';
import AccountsController from '../../accounts/controllers';
import ReviewValidationController from '../controllers/ValidationController';


const createReviewsRouter = (dependencies, analytics) => {
    const router = express.Router();
    // load controllers with dependencies
    const reviewsController = ReviewsController(dependencies, analytics);
    const accountsController = AccountsController(dependencies);
    const reviewValidationController = ReviewValidationController(dependencies);

    router.route('/*')
        .all(accountsController.verify);

    router.route('/movies/:id')
        .get(reviewsController.getMovieReview);

    router.route('/tvshows/:id')
        .get(reviewsController.getTVShowReview);

    router.route('/movies/:id')
        .post(reviewValidationController.validateMovieReview, reviewsController.addMovieReview);

    router.route('/tvshows/:id')
        .post(reviewValidationController.validateTVShowReview, reviewsController.addTVShowReview);

    return router;
};
export default createReviewsRouter;
