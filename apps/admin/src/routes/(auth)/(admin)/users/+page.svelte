<script lang="ts">
	import { Table, tableSourceValues, type TableSource } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Header from '$lib/components/Header.svelte';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import { trpc } from '$lib/trpc/client';
	import { page } from '$app/stores';

	export let data: PageData;

	$: busy = false;

	let q = '';

	const handleQuery = async () => {
		busy = true;

		const { payload } = await trpc($page).user.getUsers.query(q);
		data.users = payload;

		busy = false;
	};
</script>

<svelte:head>
	<title>รายชื่อผู้ใช้งาน | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<Header>รายชื่อผู้ใช้งาน</Header>

<div class="flex flex-col md:flex-row gap-2 pb-2">
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		<div class="input-group-shim">คำค้นหา</div>
		<input
			type="text"
			placeholder="ไอดีผู้ใช้งาน หรือ อีเมล"
			class="input p-2 w-full"
			bind:value={q}
			disabled={busy}
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					handleQuery();
				}
			}}
		/>
	</div>

	<Button class="variant-filled-primary" isLoading={busy} on:click={handleQuery}>ค้นหา</Button>
</div>

<div class="table-container">
	<table class="table table-compact">
		<thead>
			<tr>
				<th>ไอดี</th>
				<th>อีเมล</th>
				<th>สิทธิ์</th>
				<th>จัดการ</th>
			</tr>
		</thead>
		<tbody>
			{#each data.users as { id, email, roles }}
				<tr>
					<td>{id}</td>
					<td>{email}</td>
					<td class="flex gap-1">
						{#each roles as role}
							{#if role === 'ADMIN'}
								<span class="badge variant-filled-primary">แอดมิน</span>
							{:else if role === 'TEACHER'}
								<span class="badge variant-filled-error">ครูผู้สอน</span>
							{:else if role === 'STUDENT'}
								<span class="badge variant-filled">นักเรียน</span>
							{/if}
						{/each}
					</td>
					<td>
						<a href={`/users/${id}`} class="anchor">จัดการผู้ใช้งาน</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
