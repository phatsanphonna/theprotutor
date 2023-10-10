<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import FileTypeBadge from '$lib/components/FileTypeBadge.svelte';
	import Header from '$lib/components/Header.svelte';
	import { trpc } from '$lib/trpc/client';
	import { IconFilePlus } from '@tabler/icons-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: busy = false;

	let key: 'id' | 'name' = 'id';
	let q = '';

	const dateTimeFormatter = new Intl.DateTimeFormat('th-TH', {
		month: '2-digit',
		day: '2-digit',
		hour: 'numeric',
		minute: '2-digit',
		year: 'numeric'
	});

	const handleQuery = async () => {
		busy = true;

		const { payload } = await trpc($page).file.getFiles.query({
			queryBy: key,
			q
		});

		data.files = payload;

		busy = false;
	};
</script>

<svelte:head>
	<title>ไฟล์ทั้งหมด | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<Header>ไฟล์</Header>

<div class="flex gap-2 pb-2">
	<input
		disabled={busy}
		type="text"
		class="input p-2 w-full"
		placeholder="ไอดีไฟล์หรือชื่อไฟล์"
		bind:value={q}
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				handleQuery();
			}
		}}
	/>

	<Button class="variant-filled-primary" isLoading={busy} on:click={handleQuery}>ค้นหา</Button>
	<a href="/files/create" class="btn variant-filled">
		<span><IconFilePlus /></span>
		<span>สร้างไฟล์</span>
	</a>
</div>

<div class="table-container">
	<!-- Native Table Element -->
	<table class="table table-compact">
		<thead>
			<tr>
				<th>ไอดีไฟล์</th>
				<th>ชื่อไฟล์</th>
				<th>ประเภท</th>
				<th>วันที่อัพโหลด</th>
				<th>จัดการ</th>
			</tr>
		</thead>
		<tbody>
			{#each data.files as file}
				<tr>
					<td>{file.id}</td>
					<td>{file.name}</td>
					<td>
						<FileTypeBadge type={file.type} />
					</td>
					<td>
						{dateTimeFormatter.format(new Date(file.createdAt))}
					</td>
					<td>
						<a href={`/files/${file.id}`} class="anchor">จัดการไฟล์</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
