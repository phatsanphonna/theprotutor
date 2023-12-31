import { z } from 'zod';
import { teacherProcedure } from '../procedures';
import { t } from '../t';
import { TRPCError } from '@trpc/server';

export const studentRoutes = t.router({
	getStudents: teacherProcedure.input(z.string().default('')).query(async ({ ctx, input }) => {
		const { db } = ctx;

		const students = await db.student.findMany({
			take: 20,
			where: {
				OR: [
					{
						studentId: {
							contains: input
						}
					},
					{
						firstname: {
							contains: input,
							mode: 'insensitive'
						}
					},
					{
						lastname: {
							contains: input,
							mode: 'insensitive'
						}
					},
					{
						nickname: {
							contains: input,
							mode: 'insensitive'
						}
					},
					{
						guardianTelephoneNumber: {
							contains: input,
							mode: 'insensitive'
						}
					},
					{
						telephoneNumber: {
							contains: input,
							mode: 'insensitive'
						}
					},
					{
						user: {
							email: {
								contains: input,
								mode: 'insensitive'
							}
						}
					}
				]
			},
			include: {
				user: {
					select: {
						email: true
					}
				}
			},
			orderBy: {
				studentId: 'desc'
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

		if (!student) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Student not found'
			});
		}

		return { success: true, payload: student };
	}),
	getStudentByStudentId: teacherProcedure.input(z.string()).query(async ({ ctx, input }) => {
		const { db } = ctx;

		const student = await db.student.findUnique({
			where: {
				studentId: input
			},
			include: {
				user: {
					select: {
						email: true
					}
				}
			}
		});

		if (!student) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Student not found'
			});
		}

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
				telephoneNumber: z.string(),
				school: z.string(),
				grade: z.enum(['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6'])
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { db } = ctx;
			const { id, firstname, lastname, nickname, guardianTelephoneNumber, telephoneNumber, school, grade } = input;

			const student = await db.student.update({
				where: {
					id
				},
				data: {
					firstname,
					lastname,
					nickname,
					guardianTelephoneNumber,
					telephoneNumber,
					school,
					grade
				},
				include: {
					user: true
				}
			});

			return { success: true, payload: student };
		})
});
