<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/Button.svelte';
	import { IconFilePlus } from '@tabler/icons-svelte';
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';

	export let data: PageData;
	$: busy = false;
	let q = '';

	const handleQuery = async () => {
    busy = true
    const { payload } = await trpc($page).score.getScoreboards.query(q);
    data.scoreboards = payload;
    busy = false
  };
</script>

<svelte:head>
	<title>คะแนนทั้งหมด | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<Header>คะแนนทั้งหมด</Header>

<div class="flex gap-2 pb-2">
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		<div class="input-group-shim">คำค้นหา</div>
		<input
			disabled={busy}
			type="text"
			class="input p-2 w-full"
			placeholder="ไอดีของแบบทดสอบ หรือ ชื่อแบบทดสอบ"
			bind:value={q}
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					handleQuery();
				}
			}}
		/>
	</div>

	<Button class="variant-filled-primary" isLoading={busy} on:click={handleQuery}>ค้นหา</Button>
	<a href="/scores/create" class="btn variant-filled">
		<span><IconFilePlus /></span>
		<span>ประกาศคะแนน</span>
	</a>
</div>

<div class="table-container">
	<!-- Native Table Element -->
	<table class="table table-compact">
		<thead>
			<tr>
				<th>ไอดี</th>
				<th>ชื่อแบบทดสอบ</th>
				<th>จำนวนนักเรียน</th>
				<th>คะแนนเต็ม</th>
				<th>ค่าเฉลี่ย</th>
				<th>จัดการ</th>
			</tr>
		</thead>
		<tbody>
			{#each data.scoreboards as scoreboard}
				<tr>
					<td>{scoreboard.id}</td>
					<td>{scoreboard.name}</td>
					<td>{scoreboard.scores.length} คน</td>
					<td>{scoreboard.total}</td>
					<td>{scoreboard.mean}</td>
					<td>
						<div class="flex gap-2">
							<a href={`/scores/${scoreboard.id}`} class="anchor">จัดการคะแนนสอบ</a>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
