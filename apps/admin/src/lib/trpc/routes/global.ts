import { t } from '../t';

export const globalRoutes = t.router({
	getTotalSessions: t.procedure.query(async ({ ctx }) => {
		const { db } = ctx;

		const sessions = await db.session.count({
			where: {
				expires: {
					gt: new Date(),
				},
			}
		});

		return { success: true, payload: sessions };
	})
});
