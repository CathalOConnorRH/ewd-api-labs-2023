import peopleService from "./../services";
import logger from '../../utils/Winston';

export default (dependencies) => {

    const getPerson = async (request, response, next) => {
        //input
        const personId = request.params.id;
        // Treatment
        const person = await peopleService.getPerson(personId, dependencies);
        //output
        response.status(200).json(person);
    };
    const getPersonImages = async (request, response, next) => {
        //input
        const personId = request.params.id;
        // Treatment
        const personImages = await peopleService.getPersonImages(personId, dependencies);
        //output
        response.status(200).json(personImages);
    };
    const find = async (request, response, next) => {
        //input
        const query = request.query;
        // Treatment
        const people = await peopleService.find(query, dependencies);
        //output
        response.status(200).json(people);
    };

    return {
        getPerson,
        find,
        getPersonImages
    };
};
