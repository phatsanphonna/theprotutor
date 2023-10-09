import { z } from 'zod';
import { teacherProcedure } from '../procedures';
import { t } from '../t';

export const studentRoutes = t.router({
	getStudents: teacherProcedure.query(async ({ ctx }) => {
		const { db } = ctx;

		const students = await db.student.findMany({
			include: {
				user: {
					select: {
						email: true
					}
				}
			}
		});

		return { success: true, payload: students };
	}),
	getStudentById: teacherProcedure.input(z.string()).query(async ({ ctx, input }) => {
		const { db } = ctx;

		const student = await db.student.findUnique({
			where: {
				id: input
			},
			include: {
				user: {
					select: {
						email: true
					}
				}
			}
		});

		return { success: true, payload: student };
	}),
	editStudent: teacherProcedure
		.input(
			z.object({
				id: z.string(),
				firstname: z.string(),
				lastname: z.string(),
				nickname: z.string(),
				guardianTelephoneNumber: z.string(),
				telephoneNumber: z.string()
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { db } = ctx;
			const { id, firstname, lastname, nickname, guardianTelephoneNumber, telephoneNumber } = input;

			const student = await db.student.update({
				where: {
					id
				},
				data: {
					firstname,
					lastname,
					nickname,
					guardianTelephoneNumber,
					telephoneNumber
				}
			});

			return { success: true, payload: student };
		})
});
