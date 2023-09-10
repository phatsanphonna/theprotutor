import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
  const { user } = locals;

  if (!cookies.get('accessToken')) {
    throw error(403, 'โปรดเข้าสู่ระบบ')
  }

  if (!user) {
    throw redirect(304, '/register')
  }
};