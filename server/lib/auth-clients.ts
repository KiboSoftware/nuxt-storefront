
import { APIAuthClient, ShopperAuthClient } from "@kibocommerce/graphql-client"
import { getApiConfig } from "../util"
import { fetch } from "ohmyfetch"
let authTicket: any
const authTicketMemCache = {
  getAuthTicket: async () => authTicket,
  setAuthTicket: (newAuthTicket: any) => {
    authTicket = newAuthTicket
  },
}
const apiAuthClient = new APIAuthClient(getApiConfig(), fetch, authTicketMemCache)
const shopperAuthClient = new ShopperAuthClient(getApiConfig(), fetch, apiAuthClient)

export {
    apiAuthClient,
    shopperAuthClient
}
