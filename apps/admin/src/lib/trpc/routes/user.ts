import { z } from 'zod';
import { adminProcedure } from '../procedures';
import { t } from '../t';
import { TRPCError } from '@trpc/server';

export const userRoutes = t.router({
  getUsers: adminProcedure.input(z.string().default('')).query(async ({ ctx, input }) => {
    const { db } = ctx;

    const users = await db.user.findMany({
      where: {
        OR: [
          {
            id: {
              contains: input,
            },
          },
          {
            email: {
              contains: input,
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    return { success: true, payload: users };
  }),
  getUserById: adminProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const { db } = ctx;

    const user = await db.user.findUnique({
      where: {
        id: input
      },
    });

    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found',
      });
    }

    return { success: true, payload: user };
  }),
});