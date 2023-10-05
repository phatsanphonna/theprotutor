import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  const session = await locals.getSession();
  const { user } = locals;

  if (!session) {
    throw error(400, 'โปรดเข้าสู่ระบบ')
  }

  const student = await locals.db.student.findUnique({
    where: {
      id: user?.id
    }
  })

  if (!student) {
    throw redirect(304, '/register')
  }

  return {
    session,
    student
  }
};