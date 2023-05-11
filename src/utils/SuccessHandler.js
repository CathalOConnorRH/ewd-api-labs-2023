const morgan = require('morgan');
const logger = require('./Winston');

morgan.token('message', (req, res) => res.locals.errorMessage || '');

const successResponseFormat = `:method :url :status - :response-time ms`;

const successHandler = morgan(successResponseFormat, {
    skip: (req, res) => res.statusCode >= 400,
    stream: { write: (message) => logger.info(message.trim()) },
});

module.exports = successHandler;
