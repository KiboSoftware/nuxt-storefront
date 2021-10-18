import { NextFunction, Request, Response } from "express"
import logger from "../../logger"

/* eslint-disable @typescript-eslint/no-unused-vars */
export const customerLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info("Login successfull")
  return await res.status(200).send("Login successfull.")
}
