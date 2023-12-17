<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Header from '$lib/components/Header.svelte';
	import { getBytearkVideoUrl } from '$lib/utils/byteark';
	import { IconVideoPlus } from '@tabler/icons-svelte';
	import type { PageServerData } from './$types';
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	export let data: PageServerData;
	$: videos = data.videos.data;
	$: busy = false;

	let q = '';

	const displayPlaylist = (videoKey: string) => {
		modalStore.trigger({
      type: "component",
      component: "addVideoToPlaylist",
			value: {
				id: videoKey,
			},
    });
	}

	const handleQuery = () => {
		busy = true;

		videos = data.videos.data.filter((video) => {
			return video.key.includes(q) || video.title.includes(q);
		});

		busy = false
	};
</script>

<svelte:head>
	<title>วิดีโอทั้งหมด | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<Header>วิดีโอทั้งหมด</Header>

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

	<Button class="variant-filled-primary" on:click={handleQuery} isLoading={busy}>ค้นหา</Button>
	<a
		target="_blank"
		href="https://stream.byteark.com/phatsanphon/projects/theprotutor-iqlmr7/upload"
		class="btn variant-filled"
	>
		<span><IconVideoPlus /></span>
		<span>อัพโหลดวิดีโอ</span>
	</a>
</div>

<div class="table-container">
	<table class="table table-compact">
		<thead>
			<tr>
				<th>ไอดีไฟล์</th>
				<th>ชื่อไฟล์</th>
				<th>จัดการ</th>
			</tr>
		</thead>
		<tbody>
			{#each videos as video}
				<tr>
					<td>{video.key}</td>
					<td>{video.title}</td>
					<td class="flex gap-2">
						<a target="_blank" href={getBytearkVideoUrl(video.key)} class="anchor text-gray-500"
							>จัดการไฟล์</a
						>
						<button class="anchor" on:click={() => displayPlaylist(video.key)}>เพิ่มเข้าบทเรียน</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
