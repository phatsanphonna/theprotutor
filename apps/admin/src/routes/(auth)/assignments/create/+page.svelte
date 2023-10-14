<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { trpc } from '$lib/trpc/client';
	import type { Lesson, Material, Teacher } from 'database';

	interface FoundLesson extends Lesson {
		teacher: Teacher;
		materials: Material[];
	}
	let lessonId = '';
	let foundLesson: FoundLesson | null = null;

	const getLesson = async () => {
		const { success, payload } = await trpc($page).lesson.getLessonById.query(lessonId);

		if (success) {
			foundLesson = {
				...payload,
				lastUpdated: new Date(payload.lastUpdated),
				materials: payload.materials.map((material) => ({
					...material,
					createdAt: new Date(material.createdAt)
				}))
			};
		}
	};
</script>

<svelte:head>
	<title>มอบหมายงานใหม่ | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<h2 class="font-bold text-2xl md:text-4xl mb-4">มอบหมายงานใหม่</h2>

<form>
	<label class="label mb-2">
		<span>ไอดีของบทเรียน<span class="text-red-500">*</span></span>
		<div class="flex gap-2">
			<input
				class="input px-4 py-2"
				type="text"
				bind:value={lessonId}
				placeholder="ไอดีของบทเรียน"
			/>
			<Button class="variant-filled" on:click={getLesson}>ค้นหา</Button>
		</div>
	</label>

	{#if !!foundLesson}
		<div class="card">
			<header class="card-header font-bold text-2xl">รายละเอียดของบทเรียน</header>
			<section class="p-4 flex flex-col gap-4">
				<div class="label">
					<span class="font-medium text-lg">ไอดีบทเรียน</span>
					<p class="text-gray-500">{foundLesson.id}</p>
				</div>

				<div class="label">
					<span class="font-medium text-lg">ชื่อบทเรียน</span>
					<p class="text-gray-500">{foundLesson.title}</p>
				</div>

				{#if foundLesson.description}
					<div class="label">
						<span class="font-medium text-lg">คำอธิบายบทเรียน</span>
						<p class="text-gray-500">{foundLesson.description}</p>
					</div>
				{/if}

				<div class="label">
					<span class="font-medium text-lg">ชื่อผู้สอน</span>
					<p class="text-gray-500">
						{`${foundLesson.teacher.firstname} ${foundLesson.teacher.lastname}`}
					</p>
				</div>

				<div class="label">
					<span class="font-medium text-lg">อัพเดทล่าสุด</span>
					<p class="text-gray-500">{foundLesson.lastUpdated.toLocaleDateString()}</p>
				</div>
			</section>
		</div>
	{/if}
</form>
