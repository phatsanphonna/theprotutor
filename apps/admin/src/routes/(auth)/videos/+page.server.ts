import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { payload } = await router.createCaller(await createContext(event)).file.getVideosFromByteark()

	return {
		videos: payload
	};
};
