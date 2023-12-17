<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { trpc } from '$lib/trpc/client';
	import type { Student } from 'database';

	let lessonId = '';
	let foundLesson: any = null;

	let students: Array<Student> = [];
	let studentId = '';

	const addStudent = async () => {
		try {
			const { payload } = await trpc($page).student.getStudentByStudentId.query(studentId);

			const data = {
				...payload,
				createdAt: new Date(payload.createdAt)
			};

			if (payload) {
				students = [...students, data];
			}
		} catch (error) {
			console.error(error);
		}
	};

	const deleteStudent = async (studentId: string) => {
		try {
			const data = students.filter((student) => student.studentId !== studentId);
			students = data;
		} catch (error) {
			console.error(error);
		}
	};

	const getLesson = async () => {
		const { success, payload } = await trpc($page).lesson.getLessonById.query(lessonId);

		if (success) {
			foundLesson = {
				...payload,
				lastUpdated: new Date(payload.lastUpdated),
			};
		}
	};

	const createAssignment = async () => {
		try {
			const { success } = await trpc($page).assignment.assignLessonToStudent.mutate({
				lessonId,
				studentId: students.map((student) => student.id)
			});

			if (success) {
				goto(`/assignments`);
			}
		} catch (error) {
			console.error(error);
		}
	};
</script>

<svelte:head>
	<title>มอบหมายงานใหม่ | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<h2 class="font-bold text-2xl md:text-4xl mb-4">มอบหมายงานใหม่</h2>

<form on:submit|preventDefault={createAssignment}>
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

	<hr class="!border-t-2 my-4" />

	<h2 class="font-bold text-2xl md:text-4xl my-4">นักเรียนที่ได้รับมอบหมายงาน</h2>

	<div class="table-container mb-4">
		<table class="table table-compact">
			<thead>
				<tr>
					<th>รหัสนักเรียน</th>
					<th>ชื่อนักเรียน</th>
					<th>จัดการ</th>
				</tr>
			</thead>
			<tbody>
				{#each students as { firstname, lastname, nickname, studentId }}
					<tr>
						<td>{studentId}</td>
						<td>{firstname} {lastname} ({nickname})</td>
						<td>
							<button
								type="button"
								class="anchor text-error-500"
								on:click={() => deleteStudent(studentId)}>ลบ</button
							>
						</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<th colspan="1">เพิ่มนักเรียน</th>
					<td colspan="1">
						<input
							class="input p-1"
							type="text"
							bind:value={studentId}
							placeholder="รหัสนักเรียน 5 ตัว"
						/>
					</td>
					<td>
						<Button class="btn-sm variant-filled" on:click={addStudent}>เพิ่มนักเรียน</Button>
					</td>
				</tr>
			</tfoot>
		</table>
	</div>

	<div class="flex justify-end">
		<Button class="variant-filled-success" type="submit">สร้างมอบหมายงาน</Button>
	</div>
</form>
