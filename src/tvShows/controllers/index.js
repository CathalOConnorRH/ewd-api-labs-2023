import tvShowsService from "./../services";
import accountService from "../../accounts/services";

export default (dependencies, analytics) => {

    const getTvShowImages = async (request, response, next) => {
        //input
        const tvShowId = request.params.id;
        // Treatment
        const tvShowImages = await tvShowsService.getTvShowImages(tvShowId, dependencies);
        //output
        response.status(200).json(tvShowImages);
    };

    const getTvShowCredits = async (request, response, next) => {
        //input
        const tvShowId = request.params.id;
        // Treatment
        const tvShowCredits = await tvShowsService.getTvShowCredits(tvShowId, dependencies);
        //output
        response.status(200).json(tvShowCredits);
    };

    const getTvShowSimilar = async (request, response, next) => {
        //input
        const tvShowId = request.params.id;
        // Treatment
        const tvShowSimilar = await tvShowsService.getTvShowSimilar(tvShowId, dependencies);
        //output
        response.status(200).json(tvShowSimilar);

    };

    const getTvShowRecommendations = async (request, response, next) => {
        //input
        const tvShowId = request.params.id;
        // Treatment
        const tvShowRecommentations = await tvShowsService.getTvShowRecommendations(tvShowId, dependencies);
        //output
        response.status(200).json(tvShowRecommentations);

    };

    const getTvShowReviews = async (request, response, next) => {
        //input
        const tvShowId = request.params.id;
        // Treatment
        const tvShowReviews = await tvShowsService.getTvShowReviews(tvShowId, dependencies);
        //output
        response.status(200).json(tvShowReviews);
    };

    const getTvShow = async (request, response, next) => {
        //input
        const tvShowId = request.params.id;
        // Treatment
        const tvShow = await tvShowsService.getTvShow(tvShowId, dependencies);
        //output
        //output
        const authHeader = request.headers.authorization;
        const accessToken = authHeader.split(" ")[1];
        const user = await accountService.verifyToken(accessToken, dependencies);
        analytics.track({
            event: 'Get tvShow by ID',
            userId: user,
            properties: {
                tvShow: tvShowId
            }
        });
        let status = 0;
        if (tvShow['code']) {
            status = 404;
        } else {
            status = 200;
        }
        response.status(status).json(tvShow);
    };
    const find = async (request, response, next) => {
        //input
        const query = request.query;
        // Treatment
        const tvShows = await tvShowsService.find(query, dependencies);
        //output
        response.status(200).json(tvShows);
    };
    const getPopularTvShows = async (request, response, next) => {
        // Treatment
        const tvShows = await tvShowsService.getPopularTvShows(dependencies);
        //output
        response.status(200).json(tvShows);
    };

    return {
        getTvShow,
        find,
        getPopularTvShows,
        getTvShowImages,
        getTvShowCredits,
        getTvShowSimilar,
        getTvShowReviews,
        getTvShowRecommendations
    };
};
