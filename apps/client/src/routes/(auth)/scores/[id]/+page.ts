import { trpc } from "$lib/trpc/client";
import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) => {
  const { params } = event;
  const {
    payload: { score, leaderboard },
  } = await trpc(event).score.getScoreById.query(Number(params.id));

  return {
    ownScore: score,
    leaderboard,
  };
};
