import { trpc } from '$lib/trpc/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
    const { params } = event;
    const { payload } = await trpc(event).student.getStudentById.query(params.id);

    return {
        student: payload,
    };
};