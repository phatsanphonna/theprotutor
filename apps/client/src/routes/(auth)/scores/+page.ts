import { trpc } from '$lib/trpc/client';
import { getScoreRange } from '$lib/utils';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
  const { payload } = await trpc(event).score.getOwnScores.query();

  console.log(payload[0].scoreboard.mean)

  const scores = payload.map(
    ({ scoreboard, score }) => ([
      scoreboard.name,
      getScoreRange(score, scoreboard.total),
      scoreboard.mean,
    ])
  )

  const ids = payload.map(({ scoreboardId, studentId }) => ([scoreboardId, studentId]))

  return {
    scores,
    ids
  };
};