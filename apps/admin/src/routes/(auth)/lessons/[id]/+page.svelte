<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import FileTypeBadge from '$lib/components/FileTypeBadge.svelte';
	import { trpc } from '$lib/trpc/client';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { Material } from 'database';
	import type { PageData } from './$types';

	export let data: PageData;
	const toastStore = getToastStore();

	$: busy = false;
	let title = data.lesson?.title || '';
	let description = data.lesson?.description || '';
	let materials: Array<Material> =
		data.lesson.materials.map((material) => ({
			id: material.id,
			name: material.name,
			type: material.type,
			createdAt: new Date(material.createdAt),
			fileId: material.fileId,
			location: material.location,
			tags: material.tags
		})) || [];

	let findFileId = '';

	const editLesson = async () => {
		busy = true;

		try {
			const { success } = await trpc($page).lesson.editLessonById.mutate({
				id: data.lesson?.id,
				title,
				description,
				materials: materials.map((material) => material.id)
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
			const { success, payload } = await trpc($page).lesson.deleteFileFromLesson.mutate({
				lessonId: data.lesson?.id,
				fileId: id
			});

			if (success) {
				materials = payload.materials.map((material) => ({
					id: material.id,
					name: material.name,
					type: material.type,
					createdAt: new Date(material.createdAt),
					fileId: material.fileId,
					location: material.location,
					tags: material.tags
				}));

				toastStore.trigger({
					message: 'ลบไฟล์สำเร็จ',
					background: 'variant-filled-success',
					autohide: true,
					timeout: 3000
				});
			}
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

	const addFile = async () => {
		busy = true;

		try {
			const { success, payload } = await trpc($page).file.getFileById.query(findFileId);

			if (success) {
				findFileId = '';
				materials = [
					...materials,
					{
						id: payload!.id,
						name: payload!.name,
						type: payload!.type,
						createdAt: new Date(payload!.createdAt),
						fileId: payload!.fileId,
						location: payload!.location,
						tags: payload!.tags
					}
				];

				await trpc($page).lesson.editLessonById.mutate({
					id: data.lesson?.id,
					title,
					description,
					materials: materials.map((material) => material.id)
				});

				toastStore.trigger({
					message: 'เพิ่มไฟล์สำเร็จ',
					background: 'variant-filled-success',
					autohide: true,
					timeout: 3000
				});
			}
		} catch (error) {
			toastStore.trigger({
				message: 'เกิดข้อผิดพลาดในการค้นหาข้อมูล โปรดติดต่อผู้ดูแลระบบ',
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
							<button type="button" class="anchor text-error-500" on:click={() => deleteFile(id)}
								>ลบ</button
							>
						</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<th colspan="1">เพิ่มไฟล์</th>
					<td colspan="2">
						<input class="input p-1" type="text" bind:value={findFileId} placeholder="ไอดีไฟล์" />
					</td>
					<td>
						<Button class="btn-sm variant-filled-success" on:click={addFile}>เพิ่มไฟล์</Button>
					</td>
				</tr>
			</tfoot>
		</table>
	</div>
</form>
