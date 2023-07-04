const winston = require('winston');

const winstonLogger = winston.createLogger({
    level: process.env.LOGGER_LEVEL,
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [       
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

if (process.env.ENV === 'development') {
    winstonLogger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

module.exports = winstonLogger;