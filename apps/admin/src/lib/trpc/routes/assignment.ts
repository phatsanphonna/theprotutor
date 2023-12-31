import { z } from 'zod';
import { teacherProcedure } from '../procedures';
import { t } from '../t';
import { TRPCError } from '@trpc/server';

export const assignmentRoutes = t.router({
	getAssignments: teacherProcedure.query(async ({ ctx }) => {
		const { db } = ctx;

		const assignments = await db.assignment.findMany({
			orderBy: {
				assignDate: 'desc'
			},
			include: {
				assignTo: true,
				lesson: {
					include: {
						teacher: true
					}
				}
			}
		});

		return { success: true, payload: assignments };
	}),
	assignLessonToStudent: teacherProcedure
		.input(
			z.object({
				studentId: z.array(z.string()),
				lessonId: z.string()
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { db } = ctx;
			const { studentId, lessonId } = input;

			// set expired date to 4 hours from now
			const expireDate = new Date(new Date().getTime() + 4 * 60 * 60 * 1000);

			const assignments = await db.assignment.createMany({
				data: studentId.map((id) => ({
					lessonId,
					assignToId: id,
					expireDate
				}))
			});

			return { success: true, payload: assignments };
		}),
	getAssignmentById: teacherProcedure.input(z.string()).query(async ({ ctx, input }) => {
		const { db } = ctx;

		const assignment = await db.assignment.findUnique({
			where: {
				id: input
			},
			include: {
				assignTo: true,
				lesson: true
			}
		});

		if (!assignment) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Assignment not found'
			});
		}

		return { success: true, payload: assignment };
	})
});
