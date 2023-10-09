import { trpc } from '$lib/trpc/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const { payload } = await trpc(event).file.getFiles.query();

	const dateTimeFormatter = new Intl.DateTimeFormat("th-TH", {
		month: "2-digit",
		day: "2-digit",
		hour: "numeric",
		minute: "2-digit",
		year: "numeric",
	});

	const files = payload.map(({ id, name, type, createdAt }) => (
		[id, name, type, dateTimeFormatter.format(new Date(createdAt))]
	));
	const ids = payload.map(({ id }) => [id]);

	return {
		files,
		ids
	};
};
