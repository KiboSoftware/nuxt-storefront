import { fetch } from "ohmyfetch"
import type { KiboIncomingMessage, Response } from "../types/Api"
import { apiAuthClient } from "../lib/auth-clients"
export default async (req: KiboIncomingMessage, res: Response) => {
  try {
    const body = req.body
    const apiHost = `${process.env.KIBO_API_HOST}/graphql`
    const authToken = await apiAuthClient.getAccessToken()
    const response = await fetch(apiHost, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        'x-vol-user-claims': req._userClaims,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    return response.json()
  } catch (error) {
    console.error(error)
    res.statusCode = 500
  }
}
