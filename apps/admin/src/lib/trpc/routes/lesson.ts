import { z } from 'zod';
import { teacherProcedure } from '../procedures';
import { t } from '../t';
import { TRPCError } from '@trpc/server';

export const lessonRoutes = t.router({
  getLessons: teacherProcedure.input(z.string().default('')).query(async ({ ctx, input }) => {
    const { db } = ctx;

    const lessons = await db.lesson.findMany({
      where: {
        title: {
          contains: input,
          mode: 'insensitive',
        },
        id: {
          contains: input,
          mode: 'insensitive',
        },
      },
      include: {
        teacher: true,
        materials: {
          select: {
            _count: true,
          }
        }
      }
    });

    return { success: true, payload: lessons };
  }),
  getLessonById: teacherProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const { db } = ctx;

    const lesson = await db.lesson.findUnique({
      where: {
        id: input
      }
    });

    if (!lesson) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Lesson not found',
      });
    }

    return { success: true, payload: lesson };
  }),
  editLessonById: teacherProcedure.input(z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    materials: z.array(z.string()),
  })).mutation(async ({ ctx, input }) => {
    const { db } = ctx;
    const { id, title, description, materials } = input;

    const lesson = await db.lesson.update({
      where: {
        id: id
      },
      data: {
        title,
        description,
        materials: {
          connect: materials.map((id) => ({
            id
          }))
        }
      }
    });

    return { success: true, payload: lesson };
  }),
  deleteLessonById: teacherProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const { db } = ctx;

    const lesson = await db.lesson.findUnique({
      where: {
        id: input
      }
    });

    if (!lesson) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Lesson not found',
      });
    }

    await db.lesson.delete({
      where: {
        id: input,
      }
    });

    return { success: true, payload: lesson };
  }),
  createLesson: teacherProcedure.input(z.object({
    title: z.string(),
    description: z.string(),
    materials: z.array(z.string()),
  })).mutation(async ({ ctx, input }) => {
    const { db, teacher } = ctx;
    const { title, description, materials } = input;

    const lesson = await db.lesson.create({
      data: {
        title,
        description,
        materials: {
          connect: materials.map((id) => ({
            id
          }))
        },
        teacherId: teacher?.id || '',
      }
    });

    return { success: true, payload: lesson };
  }),
})