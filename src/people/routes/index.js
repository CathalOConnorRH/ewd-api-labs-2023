import express from 'express';
import PeopleController from '../controllers';
import AccountsController from '../../accounts/controllers';

const createPeopleRouter = (dependencies) => {
    const router = express.Router();
    // load controllers with dependencies
    const peopleController = PeopleController(dependencies);
    const accountsController = AccountsController(dependencies);

    router.route('/*')
        .all(accountsController.verify);

    router.route('/:id')
        .get(peopleController.getPerson);

    router.route('/:id/images')
        .get(peopleController.getPersonImages);

    return router;
};
export default createPeopleRouter;
