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
    const { db, student } = ctx;

    const studentAssignments = await db.student.findUnique({
      where: {
        id: student!.id,
      },
      select: {
        assignment: {
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
        },
      },
    });

    const assignments = studentAssignments?.assignment.map((assignment) => {
      return {
        ...assignment,
        lesson: {
          ...assignment.lesson,
          materials: assignment.lesson.materials,
        },
      };
    });

    return { success: true, payload: assignments };
  }),
  verifyPasscode: authProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const { db, student } = ctx;

    return { success: true, payload: true };
  })
});
