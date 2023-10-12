import { trpc } from '$lib/trpc/client';
import type { PageLoad } from '../$types';

export const load: PageLoad = async (event) => {
  const { payload } = await trpc(event).teacher.getAvailableTeachers.query();
  
  return {
    availableTeachers: payload
  }
};