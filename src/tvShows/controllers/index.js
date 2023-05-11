import tvShowsService from "./../services";

export default (dependencies) => {

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
        response.status(200).json(tvShow);
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
        getTvShowReviews
    };
};
