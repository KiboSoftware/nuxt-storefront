import { useCookie, setCookie } from "h3"
import { userAuthClient } from "../lib/auth-clients"
import { isShopperAuthExpired, decodeParseCookieValue, prepareSetCookieValue  } from "../util"
import type { KiboIncomingMessage, Response } from "../types/Api"
// having issues pulling from global nuxt config, for now pull this from env variable
const authCookieName = process.env.USER_COOKIE_KEY || 'kibo-at'
// max age for cookie, 5 days
const maxAge = 60*60*24*5

export default async (req: KiboIncomingMessage, res: Response) => {
  const cookieValue = useCookie(req, authCookieName)
  let authTicket = decodeParseCookieValue(cookieValue)
  if (!authTicket || (authTicket && isShopperAuthExpired(authTicket))) {
    authTicket = !authTicket
      ? await userAuthClient.anonymousAuth()
      : await userAuthClient.refreshUserAuth(authTicket)
    setCookie(res, authCookieName, prepareSetCookieValue(authTicket), { path: '/', maxAge, sameSite: true })
  }
  req._userClaims = authTicket.accessToken
}
