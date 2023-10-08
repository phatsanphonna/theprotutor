import { generateStudentId } from "$lib/utils";
import { authProcedure } from "../procedures";
import { t } from "../t";
import { z } from "zod";

export const meRoutes = t.router({
  createStudent: authProcedure
    .input(
      z.object({
        firstname: z.string(),
        lastname: z.string(),
        nickname: z.string(),
        telephoneNumber: z.string(),
        guardianTelephoneNumber: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db, user } = ctx;

      const studentId = await generateStudentId();
      const student = await db.student.create({
        data: {
          userId: user!.id,
          ...input,
          studentId,
        },
      });

      return {
        success: true,
        payload: student,
      };
    }),
  getAssignments: authProcedure.query(async ({ ctx }) => {
    const { db, user } = ctx;

    const assignments = await db.assignment.findMany({
      where: {
        assignTo: {
          every: {
            id: user?.id,
          },
        },
      },
      include: {
        lesson: {
          include: {
            materials: {
              select: {
                _count: true,
              },
            },
          },
        },
      },
    });

    return { success: true, payload: assignments };
  }),
});
