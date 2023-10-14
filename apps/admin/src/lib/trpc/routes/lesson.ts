import { z } from 'zod';
import { teacherProcedure } from '../procedures';
import { t } from '../t';
import { TRPCError } from '@trpc/server';

export const lessonRoutes = t.router({
	getLessons: teacherProcedure.input(z.string().default('')).query(async ({ ctx, input }) => {
		const { db } = ctx;

		const lessons = await db.lesson.findMany({
			where: {
				title: {
					contains: input,
					mode: 'insensitive'
				},
				id: {
					contains: input,
					mode: 'insensitive'
				}
			},
			include: {
				teacher: true,
				materials: {
					select: {
						_count: true
					}
				}
			}
		});

		return { success: true, payload: lessons };
	}),
	getLessonById: teacherProcedure.input(z.string()).query(async ({ ctx, input }) => {
		const { db } = ctx;

		const lesson = await db.lesson.findUnique({
			where: {
				id: input
			},
			include: {
				teacher: true,
				materials: true
			}
		});

		if (!lesson) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Lesson not found'
			});
		}

		return { success: true, payload: lesson };
	}),
	editLessonById: teacherProcedure
		.input(
			z.object({
				id: z.string(),
				title: z.string(),
				description: z.string(),
				materials: z.array(z.string())
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { db } = ctx;
			const { id, title, description, materials } = input;

			const lesson = await db.lesson.update({
				where: {
					id: id
				},
				data: {
					title,
					description,
					materials: {
						connect: materials.map((id) => ({
							id
						}))
					}
				}
			});

			return { success: true, payload: lesson };
		}),
	deleteLessonById: teacherProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
		const { db } = ctx;

		const lesson = await db.lesson.findUnique({
			where: {
				id: input
			}
		});

		if (!lesson) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Lesson not found'
			});
		}

		await db.lesson.delete({
			where: {
				id: input
			}
		});

		return { success: true, payload: lesson };
	}),
	createLesson: teacherProcedure
		.input(
			z.object({
				title: z.string(),
				description: z.string(),
				materials: z.array(z.string())
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { db, teacher } = ctx;
			const { title, description, materials } = input;

			console.log(teacher);

			const lesson = await db.lesson.create({
				data: {
					title,
					description,
					teacherId: teacher?.id || '',
					materials: {
						connect: materials.map((id) => ({
							id
						}))
					}
				}
			});

			return { success: true, payload: lesson };
		}),
	deleteFileFromLesson: teacherProcedure.input(z.object({ lessonId: z.string(), fileId: z.string() })).mutation(async ({ ctx, input }) => {
		const { db } = ctx;
		const { lessonId, fileId } = input;

		const lesson = await db.lesson.findUnique({
			where: {
				id: lessonId
			}
		});

		if (!lesson) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Lesson not found'
			});
		}

		const file = await db.material.findUnique({
			where: {
				id: fileId
			}
		});

		if (!file) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Material not found'
			});
		}

		const updatedLesson = await db.lesson.update({
			where: {
				id: lessonId
			},
			data: {
				materials: {
					disconnect: {
						id: fileId
					}
				}
			},
			include: {
				materials: true
			}
		});

		return { success: true, payload: updatedLesson };
	}),
});
