<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { InputChip, getToastStore } from '@skeletonlabs/skeleton';

	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';

	export let data: PageData;
	const toastStore = getToastStore();

	const rolesWhitelist = ['ADMIN', 'STUDENT', 'TEACHER'];

	let roles = data.qUser.roles;

	$: busy = false;

	const editUser = async () => {
		busy = true;

		try {
			const { success, payload } = await trpc($page).user.updateUserById.mutate({
				id: data.qUser.id,
				roles
			});

			if (success) {
				data.qUser = payload;

				toastStore.trigger({
					message: 'อัพเดทข้อมูลสำเร็จ',
					background: 'variant-ghost-success',
					autohide: true,
					timeout: 3000
				});
			}
		} catch (error) {
			toastStore.trigger({
				message: 'เกิดข้อผิดพลาดในการอัพเดทข้อมูล โปรดติดต่อผู้ดูแลระบบ',
				background: 'variant-ghost-error',
				autohide: true,
				timeout: 3000
			});
		} finally {
			busy = false;
		}
	};
</script>

<svelte:head>
	<title
		>ข้อมูลของ {data.qUser.email} | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title
	>
</svelte:head>

<h2 class="font-bold text-2xl md:text-4xl mb-4">ข้อมูลของ {data.qUser.email}</h2>

<form class="grid grid-cols-1 gap-2" on:submit|preventDefault={editUser}>
	<div class="grid grid-cols-2 gap-2">
		<label class="label">
			<span>ไอดีผู้ใช้งาน</span>
			<input
				class="input px-4 py-2"
				type="text"
				placeholder="65001"
				value={data.qUser?.id}
				readonly
			/>
		</label>

		<label class="label">
			<span>อีเมล</span>
			<input
				class="input px-4 py-2"
				type="text"
				placeholder="ชื่อจริง"
				value={data.qUser.email}
				required
				readonly
			/>
		</label>

		<div class="label">
			<span>สิทธิ์ (ADMIN, STUDENT, TEACHER)</span>

			<InputChip
				bind:value={roles}
				placeholder="ADMIN, STUDENT, TEACHER"
				name="สิทธิ์"
				allowDuplicates={false}
				allowUpperCase
				whitelist={rolesWhitelist}
			/>
		</div>
	</div>

	<div class="flex justify-end">
		<Button type="submit" isLoading={busy} class="variant-filled">แก้ไขข้อมูล</Button>
	</div>
</form>
