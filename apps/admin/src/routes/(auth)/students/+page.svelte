<script lang="ts">
	import { Table, tableSourceValues, type TableSource } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Header from '$lib/components/Header.svelte';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import { trpc } from '$lib/trpc/client';
	import { page } from '$app/stores';

	export let data: PageData;

	let q = '';

	$: busy = false;

	let tableSource: TableSource = {
		head: [
			'รหัสนักเรียน',
			'ชื่อ-นามสกุล',
			'ชื่อเล่น',
			'อีเมล',
			'เบอร์โทรศัพท์',
			'เบอร์โทรศัพท์ผู้ปกครอง'
		],
		meta: tableSourceValues(data.ids),
		body: tableSourceValues(data.students)
	};

	const handleQuery = async () => {
		busy = true;

		const { payload } = await trpc($page).student.getStudents.query(q);

		tableSource.body = tableSourceValues(
			payload.map(
				({
					studentId,
					firstname,
					lastname,
					nickname,
					telephoneNumber,
					user,
					guardianTelephoneNumber
				}) => [
					studentId,
					`${firstname} ${lastname}`,
					nickname,
					user.email,
					`${telephoneNumber.slice(0, 3)} ${telephoneNumber.slice(3, 6)} ${telephoneNumber.slice(
						6,
						10
					)}`,
					`${guardianTelephoneNumber.slice(0, 3)} ${guardianTelephoneNumber.slice(
						3,
						6
					)} ${guardianTelephoneNumber.slice(6, 10)}`
				]
			)
		);

		tableSource.meta = tableSourceValues(payload.map(({ id }) => id));

		busy = false;
	};

	const handleSelect = async (row: CustomEvent<string[]>) => {
		goto(`/students/${row.detail[0]}`);
	};
</script>

<svelte:head>
	<title>รายชื่อนักเรียน | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<Header>รายชื่อนักเรียน</Header>

<div class="flex gap-2 pb-2">
	<input
		type="text"
		class="input p-2 w-full"
		bind:value={q}
		placeholder="รหัสนักเรียน, ชื่อจริง, ชื่อเล่น, อีเมล, เบอร์โทรศัพท์ หรือ เบอร์โทรศัพท์ผู้ปกครอง"
		disabled={busy}
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				handleQuery();
			}
		}}
	/>
	<Button class="variant-filled-primary" on:click={handleQuery} isLoading={busy}>ค้นหา</Button>
</div>

<Table interactive={true} on:selected={handleSelect} source={tableSource} />
