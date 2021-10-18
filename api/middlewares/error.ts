/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable node/handle-callback-err */
import { Request, Response, NextFunction } from "express"
import logger from "../logger"

const error = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err)
  res.status(500).send("Something failed! 😱")
}

export default error
