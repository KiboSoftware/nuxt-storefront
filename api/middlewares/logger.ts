import { Request, Response, NextFunction } from "express"

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
function loggger(req: Request, res: Response | any, next: NextFunction) {
  if (
    req.path !== "/" &&
    !req.path.includes("_loading") &&
    !req.path.includes("_nuxt")
  ) {
    console.log(`-------------------------`)
    console.log(`Route: ${JSON.stringify(req.path)}`)
    console.log(`req.method: ${JSON.stringify(req.method)}`)
    console.log(`req.Params: ${JSON.stringify(req.params)}`)
    console.log(`req.Body: ${JSON.stringify(req.body)}`)
    // console.log(`req.headers: ${JSON.stringify(req.headers)}`)

    const oldSend = res.send
    res.send = function (data: any) {
      console.log(`res: ${data}`)
      oldSend.apply(res, arguments)
    }
  }

  next()
}

export default loggger
