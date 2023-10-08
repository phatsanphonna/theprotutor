import type { Handle } from "@sveltejs/kit";

export const injectSession: Handle = async ({ event, resolve }) => {
  const { locals } = event;
  const session = await locals.getSession();

  if (session?.user?.email) {
    const user = await locals.db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    locals.user = user;

    const teacher = await locals.db.student.findUnique({
      where: {
        userId: user?.id,
      },
    });

    locals.teacher = teacher;
  }

  const response = await resolve(event);
  return response;
};
