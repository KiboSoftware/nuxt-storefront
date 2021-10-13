import { format, transports, createLogger } from "winston"
const { printf, combine, timestamp, errors } = format

function buildProdLogger() {
  const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`
  })

  const config = {
    level: process.env.LOG_LEVEL || "debug",
    format: combine(
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      logFormat
    ),
    defaultMeta: { service: "user-service" },
    transports: [
      new transports.File({ filename: "logfile.log" }),
      new transports.Console(),
    ],
  }

  return createLogger(config)
}

export default buildProdLogger
