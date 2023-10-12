import { z } from "zod";
import { authProcedure } from "../procedures";
import { t } from "../t";

export const scoreRoutes = t.router({
  getOwnScores: authProcedure.query(async ({ ctx }) => {
    const { db, student } = ctx;

    const scores = await db.score.findMany({
      where: {
        studentId: student?.id,
      },
      include: {
        student: true,
        scoreboard: true,
      },
    });

    return { success: true, payload: scores };
  }),
  getScoreById: authProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const { db, student } = ctx;

      const score = await db.score.findUnique({
        where: {
          scoreboardId_studentId: {
            scoreboardId: input,
            studentId: student!.id,
          },
        },
        include: {
          student: true,
          scoreboard: {
            include: {
              scores: {
                include: {
                  student: true,
                },
              },
            },
          },
        },
      });

      const leaderboard = await db.score.findMany({
        where: {
          scoreboardId: input,
        },
        include: {
          student: true,
          scoreboard: true,
        },
        orderBy: {
          score: "desc",
        },
      });

      return {
        success: true,
        payload: {
          score,
          leaderboard,
        },
      };
    }),
});
