export default (dependencies) => {

    const { reviewSchema } = dependencies;

    const validateTVShowReview = async (request, response, next) => {
        // Input
        try {
            console.log("TVSHOW " + JSON.stringify(request.body));
            const validated = await reviewSchema['review'].validateAsync(request.body);
            request.body = validated;
            next();
        } catch (err) {
            request.body = err;
            next(new Error(`Invalid Data ${err.message}`));
            //next();
        }
    };

    const validateMovieReview = async (request, response, next) => {
        // Input
        try {
            const validated = await reviewSchema['review'].validateAsync(request.body);
            request.body = validated;
            next();
        } catch (err) {
            request.body = err;
            next(new Error(`Invalid Data ${err.message}`));
            //next();
        }
    };

    return {
        validateTVShowReview,
        validateMovieReview
    };
};
