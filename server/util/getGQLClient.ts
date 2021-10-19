import { CreateApolloClient, KiboApolloClient  } from '@kibocommerce/graphql-client';
import type { UserAuthTicket } from '@kibocommerce/graphql-client/dist/lib/AuthClient';
import type { KiboIncomingMessage, Response } from '../types';

function createGQLClient(req: KiboIncomingMessage): KiboApolloClient{
    const clientConfig = {
        accessTokenUrl:  `${process.env.KIBO_AUTH_URL}/api/platform/applications/authtickets/oauth`,
        clientId:  process.env.KIBO_CLIENT_ID || '',
        sharedSecret:  process.env.KIBO_SHARED_SECRET || '',
        apiHost: process.env.KIBO_API_HOST || ''
    }
    return CreateApolloClient({
        api: clientConfig,
        clientAuthHooks: {
            onTicketChange: () => {},
            onTicketRead: () => { return {} as UserAuthTicket},
            onTicketRemove: () => {}
        }
    }); 
}

export function getGQLClient(req: KiboIncomingMessage, res: Response) {
    if(!req._kiboClient) {
        req._kiboClient = createGQLClient(req);
    }
    return req._kiboClient;
}