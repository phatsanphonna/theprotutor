import { z } from 'zod';
import { adminProcedure } from '../procedures';
import { t } from '../t';

export const teacherRoutes = t.router({
  getTeachers: adminProcedure.input(z.string().default('')).query(async ({ ctx, input }) => {
    const { db } = ctx;

    const teachers = await db.teacher.findMany({
      take: 20,
      where: {
        OR: [
          {
            id: {
              contains: input
            }
          },
          {
            firstname: {
              contains: input,
              mode: 'insensitive'
            }
          },
          {
            lastname: {
              contains: input,
              mode: 'insensitive'
            }
          },
          {
            nickname: {
              contains: input,
              mode: 'insensitive'
            }
          },
          {
            user: {
              email: {
                contains: input,
                mode: 'insensitive'
              }
            }
          }
        ]
      },
      include: {
        user: true,
      }
    });

    return { success: true, payload: teachers };
  }),
  getTeacherById: adminProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const { db } = ctx;

    const teacher = await db.teacher.findUnique({
      where: {
        id: input
      },
      include: {
        user: true,
      }
    });

    return { success: true, payload: teacher };
  }),
  updateTeacherById: adminProcedure.input(z.object({
    id: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    nickname: z.string(),
  })).mutation(async ({ ctx, input }) => {
    const { db } = ctx;
    const { id, firstname, lastname, nickname } = input;

    const teacher = await db.teacher.update({
      where: {
        id
      },
      data: {
        firstname,
        lastname,
        nickname,
      },
      include: {
        user: true
      }
    });

    return { success: true, payload: teacher };
  }),
  getAvailableTeachers: adminProcedure.query(async ({ ctx, input }) => {
    const { db } = ctx;

    const teachers = await db.user.findMany({
      where: {
        AND: [
          {
            teacher: {
              is: null
            },
          },
          {
            roles: {
              has: 'TEACHER'
            }
          }
        ],
      }
    });

    return { success: true, payload: teachers };
  }),
  createTeacher: adminProcedure.input(z.object({
    userId: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    nickname: z.string().optional(),
  })).mutation(async ({ ctx, input }) => {
    const { db } = ctx;
    const { firstname, lastname, nickname, userId } = input;

    const teacher = await db.teacher.create({
      data: {
        firstname,
        lastname,
        nickname,
        user: {
          connect: {
            id: userId
          }
        }
      },
      include: {
        user: true
      }
    });

    return { success: true, payload: teacher };
  }),
})