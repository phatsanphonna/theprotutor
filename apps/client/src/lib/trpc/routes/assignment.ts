import { TRPCError } from '@trpc/server';
import { authProcedure } from '../procedures';
import { t } from '../t';
import { z } from 'zod';

export const assignmentRoutes = t.router({
  getAssignmentById: authProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const { db } = ctx;

    const assignment = await db.assignment.findUnique({
      where: {
        id: input
      },
      include: {
        assignTo: true,
        lesson: {
          include: {
            teacher: true,
            materials: true
          }
        }
      }
    });

    if (!assignment) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Assignment not found'
      });
    }

    return { success: true, payload: assignment };
  }),
});