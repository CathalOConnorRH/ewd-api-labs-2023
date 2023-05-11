const morgan = require('morgan');
const logger = require('./Winston');

morgan.token('message', (req, res) => res.locals.errorMessage || '');

const errorResponseFormat = `:method :url :status - :response-time ms - message: :message`;

const errorHandler = morgan(errorResponseFormat, {
    skip: (req, res) => res.statusCode < 400,
    stream: { write: (message) => logger.error(message.trim()) },
});

module.exports = errorHandler;
