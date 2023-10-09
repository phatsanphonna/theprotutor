<script lang="ts">
	import { Table, tableSourceValues, type TableSource } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Header from '$lib/components/Header.svelte';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';

	export let data: PageData;

	let key: 'id' | 'name' = 'id';
	let q = '';

	const tableSource: TableSource = {
		head: ['ไอดี', 'ชื่อไฟล์', 'ประเภท', 'วันที่อัพโหลด'],
		meta: tableSourceValues(data.ids),
		body: tableSourceValues(data.files)
	};

	const handleSelect = async (row: CustomEvent<string[]>) => {
		goto(`/files/${row.detail[0]}`);
	};
</script>

<svelte:head>
	<title>ไฟล์ทั้งหมด | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<Header>ไฟล์</Header>

<div class="flex gap-2 pb-2">
	<select class="select w-40" bind:value={key}>
		<option value="id">ไอดีไฟล์</option>
		<option value="name">ชื่อไฟล์</option>
	</select>
	<input type="text" class="input p-2 w-full" bind:value={q} />

	<Button class="variant-filled-primary">ค้นหา</Button>
	<a href="/files/create" class="btn variant-filled">สร้างไฟล์</a>
</div>

<Table on:selected={handleSelect} source={tableSource} interactive />
