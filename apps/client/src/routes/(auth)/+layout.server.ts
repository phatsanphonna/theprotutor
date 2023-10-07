import { error, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
  const session = await locals.getSession();
  const { student } = locals;

  if (!session) {
    throw error(400, "โปรดเข้าสู่ระบบ");
  }

  if (!student) {
    throw redirect(304, "/register");
  }

  return {
    session,
    student,
  };
};
