export default (dependencies) => {

    const { accountSchema } = dependencies;

    const validateAccount = async (request, response, next) => {
        // Input
        try {
            console.log("account " + JSON.stringify(request.body));

            const validated = await accountSchema['account'].validateAsync(request.body);
            request.body = validated;
            next();
        } catch (err) {
            request.body = err;
            //next(new Error(`Invalid Data ${err.message}`));
            next();
        }
    };

    return {
        validateAccount
    };
};
