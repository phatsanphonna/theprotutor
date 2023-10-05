import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  const { user, getSession } = locals;
  const session = await getSession();

  if (!session) {
    throw error(400, 'โปรดเข้าสู่ระบบ')
  }

  const student = await locals.db.student.findUnique({
    where: {
      id: user?.id
    }
  })

  if (student) {
    throw redirect(304, '/dashboard/assignments')
  }

  return {
    session
  }
};