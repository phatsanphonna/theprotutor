import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	const { user, teacher } = locals;

	if (!session) {
		throw error(401, 'Unauthorized');
	}

	return { session, user, teacher };
};
