import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	const { user, teacher } = locals;

	if (!session) {
		throw redirect(304, '/signin');
	}

	return { session, user, teacher };
};
