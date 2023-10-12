<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { Score, Student } from 'database';
	import { goto } from '$app/navigation';

	$: busy = false;

	const toastStore = getToastStore();

	interface ScoreType extends Score {
		student: Student;
	}

	let name = '';
	let total = 0;
	let scores: ScoreType[];
	$: scores = [];

	const createScoreboard = async () => {
		busy = true;

		try {
			const { success, payload } = await trpc($page).score.createScoreboard.mutate({
				name,
				total: Number(total)
			});

			if (success) {
				toastStore.trigger({
					message: 'สร้างแบบทดสอบสำเร็จ',
					background: 'variant-ghost-success',
					autohide: true,
					timeout: 3000
				});

				goto(`/scoreboards/${payload.id}`);
			}
		} catch (err) {
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
	<title>ประกาศคะแนน | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<h2 class="font-bold text-2xl md:text-4xl mb-4">ประกาศคะแนน</h2>

<form class="grid grid-cols-1 gap-2" on:submit|preventDefault={createScoreboard}>
	<label class="label">
		<span>ชื่อแบบทดสอบ<span class="text-red-500">*</span></span>
		<input class="input px-4 py-2" type="text" bind:value={name} required />
	</label>

	<div class="grid grid-cols-5 gap-2">
		<label class="label">
			<span>คะแนนเต็ม<span class="text-red-500">*</span></span>
			<input
				class="input px-4 py-2"
				type="number"
				inputmode="numeric"
				bind:value={total}
				required
			/>
		</label>

		<label class="label">
			<span>คะแนนเฉลี่ย</span>
			<input class="input px-4 py-2" type="text" value="จะถูกคำนวณเมื่อคุณสร้างแบบทดสอบ" readonly />
		</label>

		<label class="label">
			<span>ส่วนเบี่ยงเบนมาตรฐาน</span>
			<input class="input px-4 py-2" type="text" value="จะถูกคำนวณเมื่อคุณสร้างแบบทดสอบ" readonly />
		</label>

		<label class="label">
			<span>คะแนนต่ำสุด</span>
			<input
				class="input px-4 py-2 variant-ghost-error"
				type="text"
				value="จะถูกคำนวณเมื่อคุณสร้างแบบทดสอบ"
				readonly
			/>
		</label>

		<label class="label">
			<span>คะแนนสูงสุด</span>
			<input
				class="input px-4 py-2 variant-ghost-success"
				type="text"
				value="จะถูกคำนวณเมื่อคุณสร้างแบบทดสอบ"
				readonly
			/>
		</label>
	</div>

	<div class="flex justify-end">
		<Button type="submit" isLoading={busy} class="variant-filled-primary">สร้างการประกาศคะแนน</Button>
	</div>
</form>
