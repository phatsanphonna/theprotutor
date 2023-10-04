import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
    console.log(params)
    return new Response();
};