import type { RequestHandler } from '@sveltejs/kit';
import { error } from 'console';

export const GET: RequestHandler = async ({ locals, params }) => {
  const { id } = params;
  const { db, getSession } = locals;

  const session = await getSession();

  if (!session) {
    throw error(400, 'Unauthorized');
  }

  const material = await db.material.findUnique({
    where: {
      id: id
    },
    include: {
      file: true
    }
  });

  if (!material) {
    throw error(404, 'File not found');
  } else {
    const response = new Response(material.file?.data);

    response.headers.set('Content-Type', material.file?.contentType || '');
    response.headers.set('Content-Disposition', `inline; filename=${material.name}.${material.file?.ext}`);
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return response;
  }
}
