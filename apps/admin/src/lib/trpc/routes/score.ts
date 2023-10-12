import { z } from 'zod';
import { teacherProcedure } from '../procedures';
import { t } from '../t';
import { TRPCError } from '@trpc/server';
import { prisma } from 'database';

export const scoreRoutes = t.router({
  createScoreboard: teacherProcedure
    .input(
      z.object({
        name: z.string(),
        total: z.number()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const scoreboard = await db.scoreboard.create({
        data: {
          name: input.name,
          total: input.total,
          max: 0,
          mean: 0,
          min: 0,
          sd: 0
        },
        include: {
          scores: {
            include: {
              student: true
            },
            orderBy: {
              student: {
                studentId: 'desc'
              }
            }
          }
        }
      });

      return { success: true, payload: scoreboard };
    }),
  getScoreboards: teacherProcedure.input(z.string().default('')).query(async ({ ctx, input }) => {
    const { db } = ctx;

    const scoreboards = await db.scoreboard.findMany({
      where: {
        OR: [
          {
            name: {
              contains: input,
              mode: 'insensitive'
            }
          },
          {
            id: {
              equals: isNaN(Number(input)) ? undefined : Number(input)
            }
          }
        ]
      },
      include: {
        scores: true
      }
    });

    return { success: true, payload: scoreboards };
  }),
  deleteScoreboard: teacherProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    const { db } = ctx;

    const scoreboard = await db.scoreboard.findUnique({
      where: {
        id: input
      },
      include: {
        scores: true
      }
    });

    if (!scoreboard) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Scoreboard not found'
      });
    }

    await prisma.$transaction([
      db.score.deleteMany({
        where: {
          scoreboardId: input
        }
      }),
      db.scoreboard.delete({
        where: {
          id: input
        }
      })
    ]);
    return { success: true, payload: scoreboard };
  }),
  getScoreboardById: teacherProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const { db } = ctx;

    const scoreboard = await db.scoreboard.findUnique({
      where: {
        id: input
      },
      include: {
        scores: {
          include: {
            student: true
          },
          orderBy: {
            student: {
              studentId: 'desc'
            }
          }
        }
      }
    });

    if (!scoreboard) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Scoreboard not found'
      });
    }

    return { success: true, payload: scoreboard };
  }),
  editScoreboard: teacherProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        total: z.number()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;

      const scoreboard = await db.scoreboard.findUnique({
        where: {
          id: input.id
        },
        include: {
          scores: {
            include: {
              student: true
            }
          }
        }
      });

      if (!scoreboard) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Scoreboard not found'
        });
      }

      const mean =
        scoreboard.scores.length === 0
          ? 0
          : scoreboard.scores.reduce((acc, curr) => acc + curr.score, 0) / scoreboard.scores.length;
      const min =
        scoreboard.scores.length === 0
          ? 0
          : Math.min(...scoreboard.scores.map((scores) => scores.score));
      const max =
        scoreboard.scores.length === 0
          ? 0
          : Math.max(...scoreboard.scores.map((scores) => scores.score));
      const sd =
        scoreboard.scores.length === 0
          ? 0
          : Math.sqrt(
            scoreboard.scores.reduce((acc, curr) => acc + Math.pow(curr.score - mean, 2), 0) /
            scoreboard.scores.length
          );

      const updatedScoreboard = await db.scoreboard.update({
        where: {
          id: input.id
        },
        data: {
          name: input.name,
          total: input.total,
          mean,
          min,
          max,
          sd
        },
        include: {
          scores: {
            include: {
              student: true
            }
          }
        }
      });

      return { success: true, payload: updatedScoreboard };
    }),
  updateStudentScore: teacherProcedure
    .input(
      z.object({
        id: z.number(),
        scores: z.array(
          z.object({
            score: z.number(),
            studentId: z.string()
          })
        )
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const { id, scores } = input;

      const mean =
      scores.length === 0
          ? 0
          : scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length;
      const max = scores.length === 0 ? 0 : Math.max(...scores.map((student) => student.score));
      const min = scores.length === 0 ? 0 : Math.min(...scores.map((student) => student.score));
      const sd =
      scores.length === 0
          ? 0
          : Math.sqrt(
            scores.reduce((acc, curr) => acc + Math.pow(curr.score - mean, 2), 0) /
            scores.length
          );

      const students = await db.scoreboard.update({
        where: {
          id
        },
        data: {
          max,
          mean,
          min,
          sd,
          scores: {
            connectOrCreate: scores.map((student) => ({
              where: {
                scoreboardId_studentId: {
                  scoreboardId: id,
                  studentId: student.studentId
                }
              },
              create: {
                score: student.score,
                studentId: student.studentId
              }
            }))
          }
        },
        include: {
          scores: {
            include: {
              student: true
            }
          }
        }
      })

      return { success: true, payload: students };
    }),
  deleteStudentScore: teacherProcedure
    .input(
      z.object({
        id: z.number(),
        studentId: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const { id, studentId } = input;

      await db.score.delete({
        where: {
          scoreboardId_studentId: {
            scoreboardId: id,
            studentId
          }
        }
      });

      const scoreboard = await db.scoreboard.findUnique({
        where: {
          id
        },
        include: {
          scores: {
            include: {
              student: true
            }
          }
        }
      });

      const { scores } = scoreboard || { scores: [] };

      const mean =
        scores.length === 0 ? 0 : scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length;
      const max = scores.length === 0 ? 0 : Math.max(...scores.map((scores) => scores.score));
      const min = scores.length === 0 ? 0 : Math.min(...scores.map((scores) => scores.score));
      const sd =
        scores.length === 0
          ? 0
          : Math.sqrt(
            scores.reduce((acc, curr) => acc + Math.pow(curr.score - mean, 2), 0) / scores.length
          );

      const updatedStudent = await db.scoreboard.update({
        where: {
          id
        },
        data: {
          max,
          mean,
          min,
          sd
        },
        include: {
          scores: {
            include: {
              student: true
            }
          }
        }
      });

      return { success: true, payload: updatedStudent };
    })
});
