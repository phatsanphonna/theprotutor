import type { RequestEvent } from '@sveltejs/kit';
import type { inferAsyncReturnType } from '@trpc/server';

export async function createContext({ locals }: RequestEvent) {
	return {
		...locals
	};
}

export type Context = inferAsyncReturnType<typeof createContext>;
