import { trpc } from '$lib/trpc/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const { payload } = await trpc(event).student.getStudents.query();

	const students = payload.map(
		({
			studentId,
			firstname,
			lastname,
			nickname,
			telephoneNumber,
			user,
			guardianTelephoneNumber
		}) => [
			studentId,
			`${firstname} ${lastname}`,
			nickname,
			user.email,
			`${telephoneNumber.slice(0, 3)} ${telephoneNumber.slice(3, 6)} ${telephoneNumber.slice(
				6,
				10
			)}`,
			`${guardianTelephoneNumber.slice(0, 3)} ${guardianTelephoneNumber.slice(
				3,
				6
			)} ${guardianTelephoneNumber.slice(6, 10)}`
		]
	);
	const ids = payload.map(({ id }) => [id]);

	return {
		students,
		ids
	};
};
