import { TRPCError } from '@trpc/server';
import { FileType, prisma } from 'database';
import { z } from 'zod';
import { teacherProcedure } from '../procedures';
import { t } from '../t';

export const fileRoutes = t.router({
  getFiles: teacherProcedure.query(async ({ ctx }) => {
    const { db } = ctx;

    const files = await db.material.findMany({
      include: {
        file: true,
      }
    });

    return { success: true, payload: files };
  }),
  getFileById: teacherProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const { db } = ctx;

    const file = await db.material.findUnique({
      where: {
        id: input
      }
    });

    return { success: true, payload: file };
  }),
  deleteFileById: teacherProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const { db } = ctx;

    const material = await db.material.findUnique({
      where: {
        id: input
      }
    });

    if (!material) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'File not found'
      });
    }

    await prisma.$transaction([
      db.material.delete({
        where: {
          id: input,
        }
      }),
      db.file.delete({
        where: {
          id: material?.fileId || ''
        },
      }),
    ]);

    return { success: true, payload: material };
  }),
  editFileById: teacherProcedure.input(z.object({
    id: z.string(),
    name: z.string(),
  })).mutation(async ({ ctx, input }) => {
    const { db } = ctx;
    const { id, name } = input;

    const file = await db.file.update({
      where: {
        id
      },
      data: {
        name,
      }
    });

    return { success: true, payload: file };
  }),
  uploadFile: teacherProcedure.input(z.object({
    name: z.string(),
    type: z.enum([FileType.FILE, FileType.VIDEO]),
    location: z.string()
  })).mutation(async ({ ctx, input }) => {
    const { db } = ctx;
    const { name, type, location } = input;

    const newFile = await db.material.create({
      data: {
        name,
        location,
        type
      }
    });

    return { success: true, payload: newFile };
  })
});
