import { z } from 'zod';
import { teacherProcedure } from '../procedures';
import { t } from '../t';
import { TRPCError } from '@trpc/server';
import { getVideoByKey } from '$lib/utils/byteark';

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
			}
		});

		if (!lesson) {
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Lesson not found'
			});
		}

		const videos = await Promise.all(lesson.videos.map(async (id) => {
			const video = getVideoByKey(id);
			return video;
		}))

		return { success: true, payload: {
			...lesson,
			videos
		} };
	}),
	editLessonById: teacherProcedure
		.input(
			z.object({
				id: z.string(),
				title: z.string(),
				description: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { db } = ctx;
			const { id, title, description } = input;

			const lesson = await db.lesson.update({
				where: {
					id: id
				},
				data: {
					title,
					description,
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
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { db, teacher } = ctx;
			const { title, description } = input;

			console.log(teacher);

			const lesson = await db.lesson.create({
				data: {
					title,
					description,
					teacherId: teacher?.id || '',
				}
			});

			return { success: true, payload: lesson };
		}),
	deleteVideoFromLesson: teacherProcedure
		.input(z.object({ lessonId: z.string(), videoId: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const { db } = ctx;
			const { lessonId, videoId } = input;

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

			const updatedLesson = await db.lesson.update({
				where: {
					id: lessonId
				},
				data: {
					videos: {
						set: lesson.videos.filter((id) => id !== videoId)
					}
				}
			});

			return { success: true, payload: updatedLesson };
		}),
	addVideo: teacherProcedure.input(
		z.object({ lessonId: z.string(), videoId: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const { db } = ctx;
			const { lessonId, videoId } = input;

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

			if (lesson.videos.includes(videoId)) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Video already exists'
				});
			}

			const video = await db.lesson.update({
				where: {
					id: lessonId
				},
				data: {
					videos: {
						push: videoId
					}
				}
			});

			return { success: true, payload: video };
		})
});
