<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import FileTypeBadge from '$lib/components/FileTypeBadge.svelte';
	import { trpc } from '$lib/trpc/client';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	$: busy = false;
	let title = '';
	let description = '';

	const createLesson = async () => {
		busy = true;

		try {
			const { success, payload } = await trpc($page).lesson.createLesson.mutate({
				title,
				description
			});

			if (success) {
				toastStore.trigger({
					message: 'สร้างบทเรียนสำเร็จ',
					background: 'variant-filled-success',
					autohide: true,
					timeout: 3000
				});
				goto(`/lessons/${payload.id}`);
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
</script>

<svelte:head>
	<title>สร้างบทเรียนใหม่ | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<form on:submit|preventDefault={createLesson}>
	<h2 class="font-bold text-2xl md:text-4xl mb-4">สร้างบทเรียนใหม่</h2>

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
	</div>

	<!-- <hr class="!border-t-2 my-4" /> -->

	<!-- <h3 class="font-bold text-2xl md:text-4xl my-4">ไฟล์ที่อยู่ในบทเรียน</h3> -->

	<!-- <div class="table-container mb-4">
		<table class="table table-compact">
			<thead>
				<tr>
					<th>ไอดีไฟล์</th>
					<th>ชื่อไฟล์</th>
					<th>ประเภท</th>
					<th>จัดการ</th>
				</tr>
			</thead>
			<tbody>
				{#each materials as { name, type, id }}
					<tr>
						<td>{id}</td>
						<td>{name}</td>
						<td><FileTypeBadge {type} /></td>
						<td>
							<button class="anchor text-error-500">ลบ</button>
						</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<th colspan="3">เพิ่มไฟล์</th>
					<td>
						<Button class="btn-sm variant-filled-success">เพิ่มไฟล์</Button>
					</td>
				</tr>
			</tfoot>
		</table>
	</div> -->

	<div class="flex justify-end gap-2">
		<Button class="variant-filled-primary" isLoading={busy} type="submit">สร้างบทเรียน</Button>
	</div>
</form>
