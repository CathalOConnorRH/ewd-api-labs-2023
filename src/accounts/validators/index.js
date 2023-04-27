//* validators/register.validator.js
import Joi from 'joi';

const accountSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{7,20})/).required(),
    firstName: Joi.string().min(1).max(30).required(),
    lastName: Joi.string().min(1).max(30).required()
});

export default {account: accountSchema};
