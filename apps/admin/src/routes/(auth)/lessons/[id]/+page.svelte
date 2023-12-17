<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { trpc } from '$lib/trpc/client';
	import type { Video } from '$lib/utils/byteark/interface';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;
	const toastStore = getToastStore();

	$: busy = false;
	let title = data.lesson?.title || '';
	let description = data.lesson?.description || '';
	let videos: Array<Video> = data.lesson?.videos || [];

	const editLesson = async () => {
		busy = true;

		try {
			const { success } = await trpc($page).lesson.editLessonById.mutate({
				id: data.lesson?.id,
				title,
				description
			});

			if (success) {
				toastStore.trigger({
					message: 'อัพเดทข้อมูลสำเร็จ',
					background: 'variant-filled-success',
					autohide: true,
					timeout: 3000
				});
			}
		} catch (error) {
			toastStore.trigger({
				message: 'เกิดข้อผิดพลาดในการอัพเดทข้อมูล โปรดติดต่อผู้ดูแลระบบ',
				background: 'variant-filled-error',
				autohide: true,
				timeout: 3000
			});
		} finally {
			busy = false;
		}
	};

	const deleteFile = async (id: string) => {
		busy = true;

		try {
			await trpc($page).lesson.deleteVideoFromLesson.mutate({
				lessonId: data.lesson?.id,
				videoId: id
			});

			videos = videos.filter((video) => video.key !== id);
	
			toastStore.trigger({
				message: 'ลบไฟล์สำเร็จ',
				background: 'variant-filled-success',
				autohide: true,
				timeout: 3000
			});
		} catch (err) {
			toastStore.trigger({
				message: 'เกิดข้อผิดพลาดในการลบไฟล์ โปรดติดต่อผู้ดูแลระบบ',
				background: 'variant-filled-error',
				autohide: true,
				timeout: 3000
			});
		} finally {
			busy = false;
		}
	};
</script>

<svelte:head>
	<title
		>แก้ไขบทเรียนของ {data.lesson?.title} | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title
	>
</svelte:head>

<form on:submit|preventDefault={editLesson}>
	<h2 class="font-bold text-2xl md:text-4xl mb-4">แก้ไขบทเรียนของ {data.lesson?.title}</h2>

	<div class="grid grid-cols-1 gap-2">
		<label class="label">
			<span>ชื่อบทเรียน<span class="text-red-500">*</span></span>
			<input
				class="input px-4 py-2"
				type="text"
				placeholder="How to go to space by Elon Musk from zero to hero!"
				bind:value={title}
				required
			/>
		</label>

		<label class="label">
			<span>รายละเอียดของบทเรียน (สามารถใช้ภาษา Markdown เขียนได้)</span>
			<textarea
				bind:value={description}
				class="textarea px-4 py-2"
				rows="4"
				placeholder="รายละเอียดของบทเรียน"
			/>
		</label>

		<div class="flex justify-end gap-2">
			<!-- <Button class="variant-soft-error" isLoading={busy}>ลบบทเรียน</Button> -->
			<Button class="variant-filled-primary" isLoading={busy} type="submit">อัพเดทข้อมูล</Button>
		</div>
	</div>

	<hr class="!border-t-2 my-4" />

	<h2 class="font-bold text-2xl md:text-4xl my-4">ไฟล์ที่อยู่ในบทเรียน</h2>

	<div class="table-container mb-4">
		<table class="table table-compact">
			<thead>
				<tr>
					<th>ไอดีไฟล์</th>
					<th>ชื่อไฟล์</th>
					<th>จัดการ</th>
				</tr>
			</thead>
			<tbody>
				{#each videos as { title, key }}
					<tr>
						<td>{key}</td>
						<td>{title}</td>
						<td>
							<button type="button" class="anchor text-error-500" on:click={() => deleteFile(key)}
								>ลบ</button
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</form>
