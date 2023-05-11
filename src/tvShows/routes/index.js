import express from 'express';
import TvShowsController from '../controllers';
import AccountsController from '../../accounts/controllers';

const createTvShowsRouter = (dependencies) => {
    const router = express.Router();
    // load controllers with dependencies
    const tvShowsController = TvShowsController(dependencies);
    const accountsController = AccountsController(dependencies);

    router.route('/*')
        .all(accountsController.verify); 

    router.route('/:id')
        .get(tvShowsController.getTvShow);

    router.route('/')
        .get(tvShowsController.find);

    router.route('/popular')
        .get(tvShowsController.getPopularTvShows);

    router.route('/:id/images')
        .get(tvShowsController.getTvShowImages);

    router.route('/:id/credits')
        .get(tvShowsController.getTvShowCredits);

    router.route('/:id/reviews')
        .get(tvShowsController.getTvShowReviews);

    router.route('/:id/similar')
        .get(tvShowsController.getTvShowSimilar);
    return router;
};
export default createTvShowsRouter;
