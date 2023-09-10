import { injectSession } from '$lib/server/middlewares';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const handle: Handle = sequence(injectSession)