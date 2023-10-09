import { TRPCError } from '@trpc/server';
import { t } from './t';
import { Role } from 'database';

export const trpcAuthMiddleware = t.middleware(({ next, ctx }) => {
	const { user } = ctx;

	if (!user) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}

	return next({ ctx });
});

export const trpcTeacherMiddleware = t.middleware(({ next, ctx }) => {
	const { user } = ctx;

	if (user?.roles.includes(Role.ADMIN)) {
		return next({ ctx });
	} else if (!user?.roles.includes(Role.TEACHER)) {
		throw new TRPCError({ code: 'FORBIDDEN' });
	}

	return next({ ctx });
});

export const trpcAdminMiddleware = t.middleware(({ next, ctx }) => {
	const { user } = ctx;

	if (!user?.roles.includes(Role.ADMIN)) {
		throw new TRPCError({ code: 'FORBIDDEN' });
	}

	return next({ ctx });
});
