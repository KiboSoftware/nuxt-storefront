import { URL } from 'url';
import type { KiboIncomingMessage } from '../types/Api';
// eslint-disable-next-line require-await
export default async (req:KiboIncomingMessage) => {
    try {
        const requestedUrl = new URL(`https://${req.headers.host}${req.originalUrl}`);
        const params = Object.fromEntries(requestedUrl.searchParams.entries())
        req.searchParams = params;
    } catch (error) {
        console.warn(``, error);
    }
}