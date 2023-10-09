import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
  const session = await locals.getSession();
  const { user, student } = locals;

  return { session, user, student };
};
