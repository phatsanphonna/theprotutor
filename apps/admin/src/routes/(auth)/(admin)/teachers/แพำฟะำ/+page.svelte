<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { trpc } from '$lib/trpc/client';
	import {
		Autocomplete,
		getToastStore,
		type AutocompleteOption
	} from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	const toastStore = getToastStore();

	export let data: PageData;
	$: busy = false;

	let firstname = '';
	let lastname = '';
	let nickname = '';
	let userId = '';
	let userEmail = '';

	const createTeacher = async () => {
		busy = true;

		try {
			const { success, payload } = await trpc($page).teacher.createTeacher.mutate({
				userId,
				firstname,
				lastname,
				nickname
			});

			if (success) {
				toastStore.trigger({
					message: 'เพิ่มข้อมูลของผู้สอนสำเร็จ',
					background: 'variant-filled-success',
					autohide: true,
					timeout: 3000
				});
				goto(`/teachers/${payload.id}`);
			}
		} catch (error) {
			toastStore.trigger({
				message: 'เกิดข้อผิดพลาดในการเพิ่มข้อมูล โปรดติดต่อผู้ดูแลระบบ',
				background: 'variant-filled-error',
				autohide: true,
				timeout: 3000
			});
		} finally {
			busy = false;
		}
	};

	const availableTeachers: AutocompleteOption[] = data.availableTeachers.map((user) => ({
		value: user.id,
		label: user.email || ''
	}));

	function onTeacherSelection(event: CustomEvent<AutocompleteOption>): void {
		userId = event.detail.value as string;
		userEmail = event.detail.label as string;
	}
</script>

<svelte:head>
	<title>เพิ่มผู้สอน | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>

<h2 class="font-bold text-2xl md:text-4xl mb-4">เพิ่มผู้สอน</h2>

<form class="grid grid-cols-1 gap-2" on:submit|preventDefault={createTeacher}>
	<label class="label">
		<span>ผู้ใช้งาน<span class="text-red-500">*</span></span>
		<input
			class="input autocomplete px-4 py-2"
			type="search"
			bind:value={userEmail}
			placeholder="ใช้อีเมลในการค้นหาเท่านั้น"
		/>
		<div
			class="card w-full max-h-48 p-2 overflow-y-auto"
			tabindex="-1"
		>
			<Autocomplete
				emptyState={'ไม่พบผู้ใช้งานที่มีสถานะเป็นผู้่สอน'}
				bind:input={userEmail}
				options={availableTeachers}
				on:selection={onTeacherSelection}
			/>
		</div>
	</label>

	<div class="grid grid-cols-1 md:grid-cols-3 gap-2">
		<label class="label">
			<span>ชื่อจริง<span class="text-red-500">*</span></span>
			<input
				class="input px-4 py-2"
				type="text"
				placeholder="ชื่อจริง"
				bind:value={firstname}
				required
			/>
		</label>

		<label class="label">
			<span>นามสกุล<span class="text-red-500">*</span></span>
			<input
				class="input px-4 py-2"
				type="text"
				placeholder="นามสกุล"
				bind:value={lastname}
				required
			/>
		</label>

		<label class="label">
			<span>ชื่อเล่น</span>
			<input class="input px-4 py-2" type="text" placeholder="ชื่อเล่น" bind:value={nickname} />
		</label>
	</div>

	<div class="flex justify-end">
		<Button type="submit" isLoading={busy} class="variant-filled-primary">เพิ่มผู้สอน</Button>
	</div>
</form>
