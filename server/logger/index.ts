/* eslint-disable @typescript-eslint/no-explicit-any */
import winston from "winston"
const { format, transports, createLogger } = winston
const { printf, combine, timestamp, colorize, errors } = format

function buildDevLogger() {
  const logFormat = printf(({ level, message, timestamp, stack }: any) => {
    return `${timestamp} ${level}: ${stack || message}`
  })

  let format
  if (process.env.NODE_ENV === "development") {
    format = combine(
      colorize(),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      logFormat
    )
  } else {
    format = combine(
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      logFormat
    )
  }

  const config = {
    level: process.env.LOG_LEVEL || "debug",
    format,
    transports: [new transports.File({ filename: "logfile.log" }), new transports.Console()],
  }

  return createLogger(config)
}

// export
const logger = buildDevLogger()
export default logger

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
