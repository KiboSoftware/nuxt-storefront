import { Request, Response } from "express"

/* eslint-disable @typescript-eslint/no-unused-vars */
export const customerLogin = async (req: Request, res: Response) => {
  return await res.status(200).send("Login successfull.")
}
