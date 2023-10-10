import { z } from 'zod';
import { teacherProcedure } from '../procedures';
import { t } from '../t';

export const scoreRoutes = t.router({
  getScoreboards: teacherProcedure.input(z.string().default('')).query(async ({ ctx, input }) => {
    const { db } = ctx;

    const scoreboards = await db.scoreboard.findMany({
      where: {
        name: {
          contains: input,
          mode: 'insensitive',
        },
      },
      include: {
        scores: true,
      }
    });

    return { success: true, payload: scoreboards };
  })
})