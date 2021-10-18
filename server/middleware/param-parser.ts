import { URL } from 'url';

export default async (req:any, res:any) => {
    try {
        const requestedUrl = new URL(`https://${req.headers.host}${req.originalUrl}`);
        const params = Object.fromEntries(requestedUrl.searchParams.entries())
        req.searchParams = params;
    } catch (error) {
        console.warn(``, error);
    }
}