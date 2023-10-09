<script lang="ts">
	import { Table, tableSourceValues, type TableSource } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Header from '$lib/components/Header.svelte';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';

	export let data: PageData;

	let key: 'studentId' | 'email' | 'firstname' = 'studentId';
	let q = '';

	$: busy = false;

	const tableSource: TableSource = {
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

	const handleSelect = async (row: CustomEvent<string[]>) => {
		goto(`/students/${row.detail[0]}`);
	};
</script>

<svelte:head>
	<title>รายชื่อนักเรียน | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<Header>รายชื่อนักเรียน</Header>

<div class="flex gap-2 pb-2">
	<select class="select w-40" bind:value={key}>
		<option value="studentId">รหัสนักเรียน</option>
		<option value="firstname">ชื่อจริง</option>
		<option value="email">อีเมล</option>
	</select>
	<input type="text" class="input p-2 w-full" bind:value={q} />
	<Button class="variant-filled-primary">ค้นหา</Button>
</div>

<Table interactive={true} on:selected={handleSelect} source={tableSource} />
