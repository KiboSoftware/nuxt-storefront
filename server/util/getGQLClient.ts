/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateApolloClient, KiboApolloClient } from "@kibocommerce/graphql-client"

import type { KiboIncomingMessage, Response } from "../types/Api"

function createGQLClient(req: KiboIncomingMessage): KiboApolloClient {
  const clientConfig = {
    accessTokenUrl: `${process.env.KIBO_AUTH_URL}/api/platform/applications/authtickets/oauth`,
    clientId: process.env.KIBO_CLIENT_ID || "",
    sharedSecret: process.env.KIBO_SHARED_SECRET || "",
    apiHost: process.env.KIBO_API_HOST || "",
    authHost: "",
  }
  return CreateApolloClient({
    api: clientConfig,
    clientAuthHooks: {
      onTicketChange: () => {},
      onTicketRead: () => {
        return {} as any
      },
      onTicketRemove: () => {},
    },
  })
}

export function getGQLClient(req: KiboIncomingMessage, res: Response) {
  if (!req._kiboClient) {
    req._kiboClient = createGQLClient(req)
  }
  return req._kiboClient
}
