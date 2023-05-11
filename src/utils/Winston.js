const { createLogger, format, transports } = require("winston");

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'ewd-api-assignment-2' },
    transports: [
        //
        // - Write to all logs with level `info` and below to `quick-start-combined.log`.
        // - Write all logs error (and below) to `quick-start-error.log`.
        //
        new transports.File({ filename: 'ewd-error.log', level: 'error' }),
        new transports.File({ filename: 'ewd-combined.log' }),
        new transports.Console({ format: format.combine(format.colorize(), format.simple()) }),
        new transports.Http()
    ]
});

module.exports = logger;