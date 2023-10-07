import type { Handle } from "@sveltejs/kit";

export const injectSession: Handle = async ({ event, resolve }) => {
  const session = await event.locals.getSession();

  if (session?.user?.email) {
    const user = await event.locals.db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    event.locals.user = user;

    const student = await event.locals.db.student.findUnique({
      where: {
        userId: user?.id,
      },
    });

    event.locals.student = student;
  }

  const response = await resolve(event);
  return response;
};
