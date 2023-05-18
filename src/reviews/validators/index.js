//* validators/register.validator.js
import Joi from 'joi';

const reviewSchema = Joi.object({
    author: Joi.string().min(1).max(30).required(),
    review: Joi.string().min(1).max(300).required()
});

export default { review: reviewSchema };