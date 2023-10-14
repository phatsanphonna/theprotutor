<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Header from '$lib/components/Header.svelte';
	import { trpc } from '$lib/trpc/client';
	import { IconArchiveFilled } from '@tabler/icons-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: busy = false;

	let q = '';

	const handleQuery = async () => {
		busy = true;

		const { payload } = await trpc($page).lesson.getLessons.query(q);
		data.lessons = payload;

		busy = false;
	};
</script>

<svelte:head>
	<title>รายชื่อบทเรียน | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<Header>รายชื่อบทเรียน</Header>

<div class="flex flex-col md:flex-row gap-2 mb-2">
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		<div class="input-group-shim">คำค้นหา</div>
		<input
			type="text"
			class="input p-2 w-full"
			bind:value={q}
			disabled={busy}
			placeholder="ไอดีบทเรียน หรือ ชื่อบทเรียน"
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					handleQuery();
				}
			}}
		/>
	</div>

	<Button class="variant-filled-primary" isLoading={busy} on:click={handleQuery}>ค้นหา</Button>
	{#if $page.data.teacher}
		<a href="/lessons/create" class="btn variant-filled">
			<span><IconArchiveFilled /></span>
			<span>สร้างบทเรียนใหม่</span>
		</a>
	{/if}
</div>

<div class="table-container">
	<!-- Native Table Element -->
	<table class="table table-compact">
		<thead>
			<tr>
				<th>ไอดี</th>
				<th>ชื่อบทเรียน</th>
				<th>ชื่อผู้สอน</th>
				<th>จำนวนไฟล์</th>
				<th>จัดการ</th>
			</tr>
		</thead>
		<tbody>
			{#each data.lessons as lesson}
				<tr>
					<td>{lesson.id}</td>
					<td>{lesson.title}</td>
					<td>
						{lesson.teacher.firstname}
						{lesson.teacher.lastname}
					</td>
					<td>{lesson.materials.length} ไฟล์</td>
					<td>
						<a href={`/lessons/${lesson.id}`} class="anchor">จัดการบทเรียน</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
