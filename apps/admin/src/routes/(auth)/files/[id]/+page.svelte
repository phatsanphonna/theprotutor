<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { FileType } from 'database';
	import type { PageData } from './$types';
	import Button from '$lib/components/Button.svelte';
	import { IconCheck, IconDownload } from '@tabler/icons-svelte';

	export let data: PageData;
	const toastStore = getToastStore();

	$: busy = false;
	let id = data.files.id || '';
	let name = data.files?.name || '';
	let type: FileType = data.files?.type || 'FILE';
	let location = data.files?.location || '';

	const deleteFile = async () => {
		busy = true;

		try {
			const { success } = await trpc($page).file.deleteFileById.mutate(id);

			if (success) {
				toastStore.trigger({
					message: 'ลบไฟล์สำเร็จ',
					background: 'variant-ghost-success',
					autohide: true,
					timeout: 3000
				});
				goto('/files');
			}
		} catch (error) {
			toastStore.trigger({
				message: 'เกิดข้อผิดพลาดในการอัพเดทข้อมูล โปรดติดต่อผู้ดูแลระบบ',
				background: 'variant-ghost-error',
				autohide: true,
				timeout: 3000
			});
		} finally {
			busy = false;
		}
	};

	const editFile = async () => {
		busy = true;

		try {
			const { success } = await trpc($page).file.editFileById.mutate({
				id,
				name
			});

			if (success) {
				toastStore.trigger({
					message: 'แก้ไขข้อมูลสำเร็จ',
					background: 'variant-ghost-success',
					autohide: true,
					timeout: 3000
				});
			}
		} catch (error) {
			toastStore.trigger({
				message: 'เกิดข้อผิดพลาดในการอัพเดทข้อมูล โปรดติดต่อผู้ดูแลระบบ',
				background: 'variant-ghost-error',
				autohide: true,
				timeout: 3000
			});
		} finally {
			busy = false;
		}
	};

	const copyLink = () => {
		navigator.clipboard.writeText(location);
		toastStore.trigger({
			message: 'คัดลอกลิงก์สำเร็จ',
			background: 'variant-ghost-success',
			autohide: true,
			timeout: 3000
		});
	};
</script>

<svelte:head>
	<title>แก้ไขไฟล์ | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<h2 class="font-bold text-2xl md:text-4xl mb-4">แก้ไขไฟล์</h2>

{#if data.redirected}
	<aside class="alert variant-soft-success mb-4">
		<div><IconCheck /></div>
		<div class="alert-message">
			<p>สร้างไฟล์สำเร็จ</p>
		</div>
	</aside>
{/if}

<form class="grid grid-cols-1 gap-2" on:submit|preventDefault={editFile}>
	<label class="label">
		<span>ชื่อไฟล์<span class="text-red-500">*</span></span>
		<input class="input px-4 py-2" type="text" placeholder="ชื่อไฟล์" bind:value={name} required />
	</label>

	<div class="grid grid-cols-2 gap-2">
		<label class="label">
			<span>ประเภทของไฟล์<span class="text-red-500">*</span></span>
			<select class="select" bind:value={type} required disabled>
				<option value="FILE">ไฟล์</option>
				<option value="VIDEO">วิดีโอ</option>
			</select>
		</label>

		{#if type === 'VIDEO'}
			<label class="label">
				<span>ที่อยู่ของไฟล์<span class="text-red-500">*</span></span>
				<input
					class="input px-4 py-2"
					type="text"
					placeholder="ตำแหน่งไฟล์"
					bind:value={location}
					required
				/>
			</label>
		{:else}
			<label>
				<span>ไอดีไฟล์<span class="text-red-500">*</span></span>
				<div class="flex gap-2">
					<input type="url" value={data.files?.id} class="input px-4 py-2" readonly />

					<Button class="variant-ghost" type="button" on:click={copyLink}>คัดลอกลิงก์</Button>
					<a class="btn variant-filled" target="_blank" href={data.files?.location}
						><IconDownload /></a
					>
				</div>
			</label>
		{/if}
	</div>

	<div class="flex justify-end gap-2">
		<Button class="btn variant-soft-error" isLoading={busy} on:click={deleteFile}>ลบไฟล์</Button>
		<Button class="btn variant-filled-primary" isLoading={busy} type="submit">แก้ไขข้อมูล</Button>
	</div>
</form>
