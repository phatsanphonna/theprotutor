import { trpc } from '$lib/trpc/client';
import { error } from '@sveltejs/kit';
import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) => {
  const { params } = event;
  const { payload } = await trpc(event).assignment.getAssignmentById.query(params.id);

  if (payload.expireDate && new Date(payload.expireDate) < new Date()) {
    throw error(400, {
      message: 'Assignment นี้หมดอายุแล้ว'
    });
  }

  return {
    assignment: payload || {}
  };
};
