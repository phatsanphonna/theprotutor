import { z } from 'zod';
import { teacherProcedure } from '../procedures';
import { t } from '../t';
import { deleteFile } from "storage";
import { FileType } from 'database';

export const fileRoutes = t.router({
  getFiles: teacherProcedure.query(async ({ ctx }) => {
    const { db } = ctx;

    const files = await db.file.findMany();

    return { success: true, payload: files };
  }),
  getFileById: teacherProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const { db } = ctx;

    const file = await db.file.findUnique({
      where: {
        id: input
      }
    });

    return { success: true, payload: file };
  }),
  deleteFileById: teacherProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const { db } = ctx;

    const file = await db.file.delete({
      where: {
        id: input
      }
    });

    if (file.type === FileType.FILE) {
      await deleteFile(file.location);
    }

    return { success: true, payload: file };
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
});
