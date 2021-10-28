/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CreateApolloClient,
  KiboApolloClient,
} from "@kibocommerce/graphql-client"
import type { UserAuthTicket } from "@kibocommerce/graphql-client/dist/lib/AuthClient"
import type { KiboIncomingMessage, Response } from "../types"

function createGQLClient(req: KiboIncomingMessage): KiboApolloClient {
  const clientConfig = {
    // accessTokenUrl:  `${process.env.KIBO_AUTH_URL}/api/platform/applications/authtickets/oauth`,
    accessTokenUrl: `https://home.dev10.kubedev.kibo-dev.com/api/platform/applications/authtickets/oauth`,
    // clientId: process.env.KIBO_CLIENT_ID || "",
    // sharedSecret: process.env.KIBO_SHARED_SECRET || "",
    // apiHost: process.env.KIBO_API_HOST || "",
    clientId: "mozuadmin.mpoc_app.1.0.0.Release",
    sharedSecret: "1d16d7d35b8542cba2f99216f20dca32",
    apiHost: "https://t17194-s21127.dev10.kubedev.kibo-dev.com",
  }
  return CreateApolloClient({
    api: clientConfig,
    clientAuthHooks: {
      onTicketChange: () => {},
      onTicketRead: () => {
        return {} as UserAuthTicket
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
