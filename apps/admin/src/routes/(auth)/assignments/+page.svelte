<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { IconBookUpload } from '@tabler/icons-svelte';
	import type { PageData } from './$types';
	import Button from '$lib/components/Button.svelte';

	export let data: PageData;

	const dateTimeFormatter = new Intl.DateTimeFormat('th-TH', {
		month: '2-digit',
		day: '2-digit',
		hour: 'numeric',
		minute: '2-digit',
		year: 'numeric'
	});

	$: busy = false;
	let q = '';

	const handleQuery = () => {};
</script>

<svelte:head>
	<title>การมอบหมายงาน | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<Header>การมอบหมายงาน</Header>

<div class="flex flex-col md:flex-row gap-2 pb-2">
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		<div class="input-group-shim">คำค้นหา</div>
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
	</div>

	<Button class="variant-filled-primary" isLoading={busy} on:click={handleQuery}>ค้นหา</Button>
	<a href="/assignments/create" class="btn variant-filled">
		<span><IconBookUpload /></span>
		<span>มอบหมายงานใหม่</span>
	</a>
</div>

<div class="table-container">
	<table class="table table-compact">
		<thead>
			<tr>
				<th>ไอดี</th>
				<th>ชื่อ-นามสกุลของนักเรียน</th>
				<th>ชื่อบทเรียน</th>
				<th>ชื่อผู้สอน</th>
				<th>วันที่มอบหมาย</th>
				<th>วันหมดอายุ</th>
				<th>จัดการ</th>
			</tr>
		</thead>
		<tbody>
			{#each data.assignments as assignment}
				<tr>
					<td>{assignment.id}</td>
					<td
						>{assignment.assignTo.firstname}
						{assignment.assignTo.lastname} ({assignment.assignTo.nickname})</td
					>
					<td>{assignment.lesson.title}</td>
					<td>{assignment.lesson.teacher.firstname} {assignment.lesson.teacher.lastname}</td>
					<td>
						{dateTimeFormatter.format(new Date(assignment.assignDate))}
					</td>
					<td>
						{assignment.expireDate
							? dateTimeFormatter.format(new Date(String(assignment.expireDate)))
							: 'ไม่มีกำหนด'}
					</td>
					<td>
						<a href={`/assignments/${assignment.id}`} class="anchor">จัดการงานที่มอบหมาย</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
