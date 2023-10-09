import { redirect, type RequestHandler } from '@sveltejs/kit';
import { error } from 'console';

export const GET: RequestHandler = async ({ locals, params }) => {
  const { id } = params;
  const { db, getSession } = locals;

  const session = await getSession();

  if (!session) {
    throw error(400, 'Unauthorized');
  }

  const file = await db.file.findUnique({
    where: {
      id: id
    }
  });

  if (!file) {
    throw error(404, 'File not found');
  } else {
    throw redirect(303, file.location)
  }
}
