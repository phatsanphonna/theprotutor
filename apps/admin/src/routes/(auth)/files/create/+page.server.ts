import { redirect, type Actions } from '@sveltejs/kit';
import { FileType } from 'database';
import { uploadFile } from 'storage'

export const actions: Actions = {
  create: async ({ request, locals }) => {
    const { db } = locals
    const form = await request.formData();

    const name = form.get("name") as string;
    const type = form.get("type") as FileType;
    const file = form.get("file") as File;
    let location = form.get("location") as string;

    if (type === FileType.FILE) {
      const { url } = await uploadFile(name, file);

      const newFile = await db.file.create({
        data: {
          name,
          location: url,
          type
        }
      });

      throw redirect(303, `/files/${newFile.id}`);
    } else {
      const newFile = await db.file.create({
        data: {
          name,
          location: location!,
          type
        }
      });

      throw redirect(303, `/files/${newFile.id}`);
    }
  }
};