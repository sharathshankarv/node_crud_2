const fs = require('fs');
const path = require('path');

// Define logs directory path
const logDir = path.join(__dirname, 'logs');

// Check if logs directory exists, if not, create it
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true }); // Ensures all parent folders are created if missing
}

const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(logDir, 'combined.log') }),
    ],
});

// Console logging during development
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

module.exports = logger;
