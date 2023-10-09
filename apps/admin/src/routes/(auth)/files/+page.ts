import { trpc } from '$lib/trpc/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const { payload } = await trpc(event).file.getFiles.query();

	const files = payload.map(({ id, location, name, type }) => [id, name, type]);
	const ids = payload.map(({ id }) => [id]);

	return {
		files,
		ids
	};
};
