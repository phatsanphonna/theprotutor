<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import FileTypeBadge from '$lib/components/FileTypeBadge.svelte';
	import Header from '$lib/components/Header.svelte';
	import { trpc } from '$lib/trpc/client';
	import { IconFilePlus } from '@tabler/icons-svelte';
	import type { PageData } from './$types';
	import { getBytearkVideoUrl } from '$lib/utils/byteark';

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
</script>

<svelte:head>
	<title>ไฟล์ทั้งหมด | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<Header>ไฟล์ทั้งหมด</Header>

<div class="flex flex-col md:flex-row gap-2 pb-2">
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		<div class="input-group-shim">คำค้นหา</div>
		<input
			disabled={busy}
			type="text"
			class="input p-2 w-full"
			placeholder="ไอดีไฟล์หรือชื่อไฟล์"
			bind:value={q}
			on:keydown={(e) => {}}
		/>
	</div>

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
				<th>จัดการ</th>
			</tr>
		</thead>
		<tbody>
			{#each data.files.data as video}
				<tr>
					<td>{video.key}</td>
					<td>{video.title}</td>
					<td>
						<a class="anchor">เพิ่มเข้าบทเรียน</a>
						<a href={getBytearkVideoUrl(video.key)} class="anchor">จัดการไฟล์</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
