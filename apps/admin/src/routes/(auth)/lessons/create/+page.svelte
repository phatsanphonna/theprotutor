<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { trpc } from '$lib/trpc/client';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { IconDownload } from '@tabler/icons-svelte';

	const toastStore = getToastStore();

	$: busy = false;
	let title = '';
	let description = '';
	let materials: Array<string> = [];

	const createLesson = async () => {
		busy = true;

		try {
			const { success } = await trpc($page).lesson.createLesson.mutate({
				title,
				description,
				materials
			});

			if (success) {
				toastStore.trigger({
					message: 'สร้างบทเรียนสำเร็จ',
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
</script>

<svelte:head>
	<title>สร้างบทเรียนใหม่ | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<h2 class="font-bold text-2xl md:text-4xl mb-4">สร้างบทเรียนใหม่</h2>

<form class="grid grid-cols-1 gap-2" on:submit|preventDefault={createLesson}>
	<label class="label">
		<span>ชื่อบทเรียน<span class="text-red-500">*</span></span>
		<input class="input px-4 py-2" type="text" placeholder="How to go to space by Elon Musk from zero to hero!" bind:value={title} required />
	</label>

	<div class="grid grid-cols-2 gap-2">
		<div class="label">
			<span><span class="text-red-500">*</span></span>
		</div>
	</div>

	<div class="flex justify-end gap-2">
		<Button class="btn variant-filled-primary" isLoading={busy} type="submit">สร้างบทเรียน</Button>
	</div>
</form>
