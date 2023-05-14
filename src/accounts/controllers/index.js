import accountService from "../services";

export default (dependencies, analytics) => {

    const createAccount = async (request, response) => {
        // Input
        const { firstName, lastName, email, password } = request.body;
        // Treatment
        const account = await accountService.registerAccount(firstName, lastName, email, password, dependencies);
        //output

        analytics.track({
            event: 'Create Account',
            userId: email,
        });
        response.status(201).json(account);
    };
    const getAccount = async (request, response) => {
        //input
        const accountId = request.params.id;
        // Treatment
        const account = await accountService.getAccount(accountId, dependencies);
        //output
        analytics.track({
            event: 'Get Account by ID',
            userId: account.email,
            properties: {
                accountId: accountId
            }
        });
        response.status(200).json(account);
    };
    const listAccounts = async (request, response) => {
        // Treatment
        const accounts = await accountService.find(dependencies);
        //output

        analytics.track({
            event: 'List Accounts',
            userId: "user",
        });
        response.status(200).json(accounts);
    };
    const updateAccount = async (request, response) => {
        // Input
        const id = request.params.id;
        const { firstName, lastName, email, password } = request.body
        // Treatment
        const account = await accountService.updateAccount(id, firstName, lastName, email, password, dependencies)
        //output

        analytics.track({
            event: 'Update Account',
            userId: email,
        });
        response.status(201).json(account);
    };
    const authenticateAccount = async (request, response) => {
        try {
            const { email, password } = request.body;
            const token = await accountService.authenticate(email, password, dependencies);


            const user = await accountService.verifyToken(token, dependencies);
            analytics.track({
                event: 'Authenticate Account',
                userId: user,
            });
            response.status(200).json({ token: `BEARER ${token}` });
        } catch (error) {
            response.status(401).json({ message: 'Unauthorised' });
        }
    };
    const addFavourite = async (request, response, next) => {
        try {
            const { movieId } = request.body;
            const id = request.params.id;
            const account = await accountService.addFavourite(id, movieId, dependencies);
            response.status(200).json(account);
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };
    const getFavourites = async (request, response, next) => {
        try {
            const id = request.params.id;
            const favourites = await accountService.getFavourites(id, dependencies);
            response.status(200).json(favourites);
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };
    const verify = async (request, response, next) => {
        try {
            // Input
            const authHeader = request.headers.authorization;

            // Treatment
            const accessToken = authHeader.split(" ")[1];
            const user = await accountService.verifyToken(accessToken, dependencies);

            //output
            next();
        } catch (err) {
            //Token Verification Failed
            next(new Error(`Verification Failed ${err.message}`));
        }
    };

    const getUser = async (request, response, next) => {
        try {
            // Input
            const authHeader = request.headers.authorization;

            // Treatment
            const accessToken = authHeader.split(" ")[1];
            const user = await accountService.verifyToken(accessToken, dependencies);

            //output
            response.status(200).json(user);
        } catch (err) {
            //Token Verification Failed
            next(new Error(`Verification Failed ${err.message}`));
        }
    };

    return {
        createAccount,
        getAccount,
        listAccounts,
        updateAccount,
        authenticateAccount,
        addFavourite,
        getFavourites,
        verify,
        getUser
    };
};
