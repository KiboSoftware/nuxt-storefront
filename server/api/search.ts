/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express"
import logger from "../logger"
export default (req: Request, res: Response) => {
  logger.error("Logger testing...")
  return "boo"
}
