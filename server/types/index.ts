import type { KiboApolloClient } from '@kibocommerce/graphql-client';
import type { IncomingMessage, ServerResponse } from "http"

export interface KiboIncomingMessage extends IncomingMessage {
    _kiboClient: KiboApolloClient
    searchParams?: any
    body?: any
}
export interface Response extends ServerResponse { 
    
}