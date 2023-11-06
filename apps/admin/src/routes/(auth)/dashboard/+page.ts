import { trpc } from '$lib/trpc/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const { payload } = await trpc(event).global.getTotalSessions.query();
	const { payload: passcode } = await trpc(event).passcode.getPasscode.query();
	return {
		online: payload,
		passcode: passcode.passcode
	};
};
