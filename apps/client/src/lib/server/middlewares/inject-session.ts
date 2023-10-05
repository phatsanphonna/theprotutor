import type { Handle } from '@sveltejs/kit';

export const injectSession: Handle = async ({ event, resolve }) => {
  const session = await event.locals.getSession();

	if (session?.user?.email) {
		const user = await event.locals.db.user.findUnique({
			where: {
				email: session.user.email
			}
		});

		event.locals.user = user;
	}

	const response = await resolve(event);
	return response;
}
