<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { trpc } from '$lib/trpc/client';
	import { getToastStore } from '@skeletonlabs/skeleton';

	import type { PageData } from './$types';
	import type { Grade } from 'database';

	export let data: PageData;
	const toastStore = getToastStore();

	$: busy = false;

	let firstname = data.student?.firstname || '';
	let lastname = data.student?.lastname || '';
	let nickname = data.student?.nickname || '';
	let telephoneNumber = data.student?.telephoneNumber || '';
	let guardianTelephoneNumber = data.student?.guardianTelephoneNumber || '';
	let school = data.student?.school || '';
	let grade: Grade = data.student?.grade!;

	const editStudent = async () => {
		busy = true;

		try {
			const { success, payload } = await trpc($page).student.editStudent.mutate({
				id: data.student!.id,
				firstname,
				lastname,
				nickname,
				telephoneNumber,
				guardianTelephoneNumber,
				school,
				grade
			});

			if (success) {
				toastStore.trigger({
					message: 'อัพเดทข้อมูลสำเร็จ',
					background: 'variant-filled-success',
					autohide: true,
					timeout: 3000
				});

				data.student = payload;
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

		<label class="label">
			<span>ระดับชั้น<span class="text-red-500">*</span></span>
			<select class="select" bind:value={grade}>
				<option value="P1">ประถมศึกษาปีที่ 1</option>
				<option value="P2">ประถมศึกษาปีที่ 2</option>
				<option value="P3">ประถมศึกษาปีที่ 3</option>
				<option value="P4">ประถมศึกษาปีที่ 4</option>
				<option value="P5">ประถมศึกษาปีที่ 5</option>
				<option value="P6">ประถมศึกษาปีที่ 6</option>
				<option value="M1">มัธยมศึกษาปีที่ 1</option>
				<option value="M2">มัธยมศึกษาปีที่ 2</option>
				<option value="M3">มัธยมศึกษาปีที่ 3</option>
				<option value="M4">มัธยมศึกษาปีที่ 4</option>
				<option value="M5">มัธยมศึกษาปีที่ 5</option>
				<option value="M6">มัธยมศึกษาปีที่ 6</option>
			</select>
		</label>

		<label class="label">
			<span>โรงเรียน<span class="text-red-500">*</span></span>
			<input
				class="input px-4 py-2"
				type="tel"
				placeholder="โรงเรียน"
				bind:value={school}
				required
			/>
		</label>
	</div>

	<div class="flex justify-end">
		<Button type="submit" isLoading={busy} class="variant-filled">แก้ไขข้อมูล</Button>
	</div>
</form>
