import { APIAuthClient } from "@kibocommerce/graphql-client"
// import { useNuxtApp } from "nuxt-edge"
import { fetch } from "ohmyfetch"
let authTicket: any
const authTicketMemCache = {
  getAuthTicket: async () => authTicket,
  setAuthTicket: (newAuthTicket: any) => {
    authTicket = newAuthTicket
  },
}
const apiConfig = {
  clientId: process.env.KIBO_CLIENT_ID as string,
  sharedSecret: process.env.KIBO_SHARED_SECRET as string,
  authHost: (process.env.KIBO_AUTH_URL || process.env.KIBO_AUTH_HOST) as string,
  apiHost: process.env.KIBO_API_HOST as string,
}
export const apiAuthClient = new APIAuthClient(apiConfig, fetch, authTicketMemCache)
