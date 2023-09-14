import { injectSession } from '$lib/server/middlewares';
import { trpcHandler } from '$lib/trpc/handle';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const handle: Handle = sequence(injectSession, trpcHandler)