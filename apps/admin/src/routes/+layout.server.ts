import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
    const { teacher, user, getSession } = locals;
    const session = await getSession();

    return { teacher, user, session };
};