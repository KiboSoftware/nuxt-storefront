/* eslint-disable @typescript-eslint/no-unused-vars */
import type { KiboIncomingMessage, Response } from "../types/Api"
import { apiAuthClient } from "../lib/auth-clients"

export default async (req: KiboIncomingMessage, res: Response) => {
  try {
    const body = req.headers.origin ? req.body : JSON.parse(req.body)
    const apiHost = `${process.env.KIBO_API_HOST}/graphql`
    const authToken = await apiAuthClient.getAccessToken()
    const response = await $fetch(apiHost, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "x-vol-user-claims": req._userClaims,
        "Content-Type": "application/json",
      },
      body,
    })
    return response
  } catch (error) {
    console.error(error)
    res.statusCode = 500
  }
}
