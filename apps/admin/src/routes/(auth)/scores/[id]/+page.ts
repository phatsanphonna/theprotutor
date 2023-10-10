import { trpc } from '$lib/trpc/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
  const { params } = event;
  const { payload } = await trpc(event).score.getScoreboardById.query(Number(params.id));

  return {
    scoreboard: payload
  }
};