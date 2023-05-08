//   export default
//       (error, req, res, next) => {
//           if (!error.statusCode) error.statusCode = 500;

//           if (error.statusCode === 301) {
//               return res.status(301).redirect('/not-found');
//           }

//           return res
//               .status(error.statusCode)
//               .json({ error: error.toString() });
//       };
const morgan = require('morgan');
const logger = require('./Winston');

morgan.token('message', (req, res) => res.locals.errorMessage || '');

const successResponseFormat = `:method :url :status - :response-time ms`;
const errorResponseFormat = `:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
    skip: (req, res) => res.statusCode >= 400,
    stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
    skip: (req, res) => res.statusCode < 400,
    stream: { write: (message) => logger.error(message.trim()) },
});

module.exports = {
    successHandler,
    errorHandler,
};
