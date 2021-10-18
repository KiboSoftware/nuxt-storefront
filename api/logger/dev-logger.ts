import winston from "winston"
const { format, transports, createLogger } = winston
const { printf, combine, timestamp, colorize, errors } = format

function buildDevLogger() {
  const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`
  })

  const config = {
    level: process.env.LOG_LEVEL || "debug",
    format: combine(
      colorize(),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      logFormat
    ),
    transports: [
      new transports.File({ filename: "logfile.log" }),
      new transports.Console(),
    ],
  }

  return createLogger(config)
}

export default buildDevLogger

/*
Various LOG_LEVELS
const levels = { 
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
}
*/
