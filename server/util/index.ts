import type { UserAuthTicket } from "@kibocommerce/graphql-client"

export const getApiConfig = () => {
  return {
    clientId: process.env.KIBO_CLIENT_ID as string,
    sharedSecret: process.env.KIBO_SHARED_SECRET as string,
    authHost: (process.env.KIBO_AUTH_URL || process.env.KIBO_AUTH_HOST) as string,
    apiHost: process.env.KIBO_API_HOST as string,
  }
}
export const isShopperAuthExpired = (userAuthTicket: UserAuthTicket) => {
  const { accessTokenExpiration } = userAuthTicket
  return new Date(accessTokenExpiration).getTime() < Date.now()
}

const decode = (encodedStr: string) => Buffer.from(encodedStr, "base64").toString("ascii")
const encode = (value: string) => Buffer.from(value).toString("base64")

export const decodeParseCookieValue = (cookieValue: string | undefined) => {
  try {
    if (!cookieValue) {
      return
    }
    return JSON.parse(decode(cookieValue))
  } catch (error) {
    console.warn(`Unable to parse cookie`, error)
  }
}
export const prepareSetCookieValue = (cookie: {}): string => {
  try {
    return encode(JSON.stringify(cookie))
  } catch (error) {
    console.warn(`Unable to stringify / encode cookie`, error)
    return ""
  }
}
