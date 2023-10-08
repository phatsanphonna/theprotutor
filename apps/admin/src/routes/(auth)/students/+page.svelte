<script lang="ts">
	import { Table, tableSourceValues, type TableSource } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Header from '$lib/components/Header.svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;

	const tableSource: TableSource = {
		head: ['รหัสนักเรียน', 'ชื่อ-นามสกุล', 'ชื่อเล่น', 'อีเมล', 'เบอร์โทรศัพท์'],
		meta: tableSourceValues(data.ids),
		body: tableSourceValues(data.students)
	};

	const handleSelect = async (row: CustomEvent<string[]>) => {
		goto(`/students/${row.detail[0]}`);
	};
</script>

<svelte:head>
	<title>รายชื่อนักเรียน | สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<Header>รายชื่อนักเรียน</Header>

<Table interactive={true} on:selected={handleSelect} source={tableSource} />
