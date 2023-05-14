import express from 'express';
import MoviesController from '../controllers';
import AccountsController from '../../accounts/controllers';

const createMoviesRouter = (dependencies, analytics) => {
    const router = express.Router();
    // load controllers with dependencies
    const moviesController = MoviesController(dependencies, analytics);
    const accountsController = AccountsController(dependencies);

    //router.route('/*')
    //    .all(accountsController.verify);

    router.route('/:id')
        .get(moviesController.getMovie);

    router.route('/')
        .get(moviesController.find);

    router.route('/upcoming')
        .get(moviesController.getUpcomingMovies);

    router.route('/:id/images')
        .get(moviesController.getMovieImages);

    router.route('/:id/credits')
        .get(moviesController.getMovieCredits);

    router.route('/:id/similar')
        .get(moviesController.getMovieSimilar);

    router.route('/:id/reviews')
        .get(moviesController.getMovieReviews);

    router.route('/:id/reviews')
        .post(moviesController.setMovieReview);

    return router;
};
export default createMoviesRouter;
