import { initPrisma, injectSession } from '$lib/server/middlewares';
import { authMiddleware } from '$lib/server/middlewares/auth';
import { trpcHandler } from '$lib/trpc/handle';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const handle: Handle = sequence(initPrisma, authMiddleware, injectSession, trpcHandler);
