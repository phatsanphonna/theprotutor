<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { IconFilePlus } from '@tabler/icons-svelte';
	import type { PageData } from './$types';
	import Button from '$lib/components/Button.svelte';
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';

	export let data: PageData;

	$: busy = false;
	let q = '';

	const handleQuery = async () => {
		busy = true;

		const { payload } = await trpc($page).teacher.getTeachers.query(q);
		data.teachers = payload;
	};
</script>

<svelte:head>
	<title>ผู้สอนทั้งหมด | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<Header>รายชื่อผู้สอน</Header>

<div class="flex gap-2 pb-2">
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		<div class="input-group-shim">คำค้นหา</div>
		<input
			disabled={busy}
			type="text"
			class="input p-2 w-full"
			placeholder="ไอดีผู้ใช้งาน หรือ ชื่อผู้ใช้งาน"
			bind:value={q}
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					handleQuery();
				}
			}}
		/>
	</div>

	<Button class="variant-filled-primary" isLoading={busy} on:click={handleQuery}>ค้นหา</Button>
	<a href="/teachers/create" class="btn variant-filled">
		<span><IconFilePlus /></span>
		<span>เพิ่มผู้สอน</span>
	</a>
</div>

<div class="table-container">
	<!-- Native Table Element -->
	<table class="table table-compact">
		<thead>
			<tr>
				<th>ไอดี</th>
				<th>ชื่อจริง</th>
				<th>นามสกุล</th>
				<th>ชื่อเล่น</th>
				<th>อีเมล</th>
				<th>จัดการ</th>
			</tr>
		</thead>
		<tbody>
			{#each data.teachers as teacher}
				<tr>
					<td>{teacher.id}</td>
					<td>{teacher.firstname}</td>
					<td>{teacher.lastname}</td>
					<td>{teacher.nickname || '-'}</td>
					<td>{teacher.user.email}</td>
					<td>
						<a href={`/teachers/${teacher.id}`} class="anchor">แก้ไขผู้สอน</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
