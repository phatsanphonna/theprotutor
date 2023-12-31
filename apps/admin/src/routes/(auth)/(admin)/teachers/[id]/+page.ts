import { trpc } from '$lib/trpc/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const { params } = event;
	const { payload } = await trpc(event).teacher.getTeacherById.query(params.id);

	return {
		qTeacher: payload
	};
};
