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

	const handleQuery = async () => {
		busy = true;

		const { payload } = await trpc($page).student.getStudents.query(q);
		data.students = payload;

		busy = false;
	};
</script>

<svelte:head>
	<title>รายชื่อนักเรียน | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<Header>รายชื่อนักเรียน</Header>

<div class="flex flex-col md:flex-row gap-2 mb-2">
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		<div class="input-group-shim">คำค้นหา</div>
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
	</div>
	<Button class="variant-filled-primary" on:click={handleQuery} isLoading={busy}>ค้นหา</Button>
</div>

<div class="table-container">
	<table class="table table-compact">
		<thead>
			<tr>
				<th>รหัสนักเรียน</th>
				<th>ชื่อ-นามสกุล</th>
				<th>ชื่อเล่น</th>
				<th>อีเมล</th>
				<th>เบอร์โทรศัพท์</th>
				<th>เบอร์โทรศัพท์ผู้ปกครอง</th>
				<th>จัดการ</th>
			</tr>
		</thead>
		<tbody>
			{#each data.students as { id, studentId, firstname, lastname, nickname, telephoneNumber, user, guardianTelephoneNumber }}
				<tr>
					<td>{studentId}</td>
					<td>{`${firstname} ${lastname}`}</td>
					<td>{nickname}</td>
					<td>{user.email}</td>
					<td
						>{`${telephoneNumber.slice(0, 3)} ${telephoneNumber.slice(
							3,
							6
						)} ${telephoneNumber.slice(6, 10)}`}
					</td><td
						>{`${guardianTelephoneNumber.slice(0, 3)} ${guardianTelephoneNumber.slice(
							3,
							6
						)} ${guardianTelephoneNumber.slice(6, 10)}`}
					</td>
					<td>
						<a href={`/students/${id}`} class="anchor">จัดการนักเรียน</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
