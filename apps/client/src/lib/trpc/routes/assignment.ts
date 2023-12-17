import { TRPCError } from '@trpc/server';
import { authProcedure } from '../procedures';
import { t } from '../t';
import { z } from 'zod';
import { signURL } from '$lib/server/byteark';
import { getVideoByKey } from '$lib/utils/byteark';

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

    const videos = await Promise.all(assignment.lesson.videos.map(async (id) => {
      const video = await getVideoByKey(id);
      return video;
    }));

    return { success: true, payload: {
      ...assignment,
      lesson: {
        ...assignment.lesson,
        videos
      }
    } };
  }),
  getSignedURL: authProcedure.input(z.string()).query(async ({ input }) => {
    const signedURL = signURL(input);

    return { success: true, payload: signedURL };
  })
});