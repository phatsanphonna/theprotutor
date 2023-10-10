import { trpc } from "$lib/trpc/client";
import { getScoreRange } from "$lib/utils";
import type { PageLoad } from "./$types";

export const load: PageLoad = async (event) => {
  const { payload } = await trpc(event).score.getOwnScores.query();

  if (!payload) {
    return {
      scores: [],
      ids: [],
    };
  }

  const scores = payload.map(({ scoreboard, score }) => [
    new Intl.DateTimeFormat("th-Th").format(new Date(scoreboard.timestamp)),
    scoreboard.name,
    scoreboard.mean,
    getScoreRange(score, scoreboard.total),
  ]);

  const ids = payload.map(({ scoreboardId, studentId }) => [
    scoreboardId,
    studentId,
  ]);

  return {
    scores,
    ids,
  };
};
