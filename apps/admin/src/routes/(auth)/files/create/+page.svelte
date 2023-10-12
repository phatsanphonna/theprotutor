<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { FileType } from 'database';

	$: busy = false;

	let type: FileType = 'FILE';
</script>

<svelte:head>
	<title>อัพโหลดไฟล์ | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<h2 class="font-bold text-2xl md:text-4xl mb-4">แก้ไขไฟล์</h2>

<form class="grid grid-cols-1 gap-2" action="?/create" method="POST" enctype="multipart/form-data">
	<label class="label">
		<span>ชื่อไฟล์<span class="text-red-500">*</span></span>
		<input
			class="input px-4 py-2"
			id="name"
			name="name"
			type="text"
			placeholder="ชื่อไฟล์"
			required
		/>
	</label>

	<div class="grid grid-cols-2 gap-2">
		<label class="label">
			<span>ประเภทของไฟล์<span class="text-red-500">*</span></span>
			<select name="type" id="type" class="select" bind:value={type} required>
				<option value="FILE">ไฟล์</option>
				<option value="VIDEO">วิดีโอ</option>
			</select>
		</label>

		{#if type === 'VIDEO'}
			<label class="label">
				<span>ที่อยู่ของไฟล์<span class="text-red-500">*</span></span>
				<input
					class="input px-4 py-2"
					type="text"
					id="location"
					name="location"
					placeholder="ตำแหน่งไฟล์"
					required
				/>
			</label>
		{:else}
			<label>
				<span>ไฟล์<span class="text-red-500">*</span></span>
				<input type="file" name="file" id="file" class="input px-4 py-2" accept="application/pdf" />
			</label>
		{/if}
	</div>

	<div class="flex justify-end gap-2">
		<Button class="btn variant-filled-primary" isLoading={busy} type="submit">
			{#if type === 'VIDEO'}
				บันทึกข้อมูล
			{:else}
				อัพโหลด
			{/if}
		</Button>
	</div>
</form>
