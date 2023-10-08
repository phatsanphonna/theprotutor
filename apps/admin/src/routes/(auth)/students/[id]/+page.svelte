<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { trpc } from '$lib/trpc/client';
	import { getToastStore } from '@skeletonlabs/skeleton';

	import type { PageData } from './$types';

	export let data: PageData;
	const toastStore = getToastStore();

	let busy = true;

	let firstname = data.student?.firstname || '';
	let lastname = data.student?.lastname || '';
	let nickname = data.student?.nickname || '';
	let telephoneNumber = data.student?.telephoneNumber || '';
	let guardianTelephoneNumber = data.student?.guardianTelephoneNumber || '';

	const editStudent = async () => {
		busy = true;

		try {
			const { success } = await trpc($page).student.editStudent.mutate({
				id: data.student!.id,
				firstname,
				lastname,
				nickname,
				telephoneNumber,
				guardianTelephoneNumber
			});

			if (success) {
				toastStore.trigger({
					message: 'อัพเดทข้อมูลสำเร็จ',
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
</script>

<svelte:head>
	<title
		>ข้อมูลนักเรียนของ {data.student?.firstname}
		{data.student?.lastname} | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title
	>
</svelte:head>

<h2 class="font-bold text-2xl md:text-4xl mb-4">
	ข้อมูลนักเรียนของ {data.student?.firstname}
	{data.student?.lastname}
</h2>

<form class="grid grid-cols-1 gap-2" on:submit|preventDefault={editStudent}>
	<label class="label">
		<span>รหัสนักเรียน</span>
		<input
			class="input px-4 py-2"
			type="text"
			placeholder="65001"
			value={data.student?.studentId}
			readonly
			required
		/>
	</label>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-2">
		<label class="label">
			<span>ชื่อจริง</span>
			<input
				class="input px-4 py-2"
				type="text"
				placeholder="ชื่อจริง"
				bind:value={firstname}
				required
			/>
		</label>

		<label class="label">
			<span>นามสกุล</span>
			<input
				class="input px-4 py-2"
				type="text"
				placeholder="นามสกุล"
				bind:value={lastname}
				required
			/>
		</label>

		<label class="label">
			<span>ชื่อเล่น</span>
			<input
				class="input px-4 py-2"
				type="text"
				placeholder="ชื่อเล่น"
				bind:value={nickname}
				required
			/>
		</label>
	</div>

	<label class="label">
		<span>อีเมล</span>
		<input
			class="input px-4 py-2"
			type="email"
			placeholder="elonmusk@spacex.com"
			readonly
			value={data.student?.user.email}
			required
		/>
	</label>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
		<label class="label">
			<span>เบอร์โทรศัพท์</span>
			<input
				class="input px-4 py-2"
				type="tel"
				placeholder="เบอร์โทรศัพท์"
				bind:value={telephoneNumber}
				required
			/>
		</label>

		<label class="label">
			<span>เบอร์โทรศัพท์ผู้ปกครอง</span>
			<input
				class="input px-4 py-2"
				type="tel"
				placeholder="เบอร์โทรศัพท์ผู้ปกครอง"
				bind:value={guardianTelephoneNumber}
				required
			/>
		</label>
	</div>

	<Button type="submit" isLoading={busy} class="variant-filled">แก้ไขข้อมูล</Button>
</form>

<hr class="!border-t-2 my-4" />

<div>
	<h3 class="font-bold text-2xl md:text-4xl mb-4">งานที่ได้รับมอบหมาย</h3>
</div>
