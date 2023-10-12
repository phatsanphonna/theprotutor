<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { trpc } from '$lib/trpc/client';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

  const toastStore = getToastStore()

	export let data: PageData;
	$: busy = false;

	let firstname = data.qTeacher?.firstname || '';
	let lastname = data.qTeacher?.lastname || '';
	let nickname = data.qTeacher?.nickname || '';

	const editTeacher = async () => {
    busy = true;

    try {
      const { success, payload } = await trpc($page).teacher.updateTeacherById.mutate({
        id: data.qTeacher!.id,
        firstname,
        lastname,
        nickname
      });

      if (success) {
        data.qTeacher = payload;

        toastStore.trigger({
        message: 'อัพเดทข้อมูลสำเร็จ',
        background: 'variant-filled-success',
        autohide: true,
        timeout: 3000
      });
      }
    } catch (error) {
      toastStore.trigger({
        message: 'เกิดข้อผิดพลาดในการอัพเดทข้อมูล โปรดติดต่อผู้ดูแลระบบ',
        background: 'variant-filled-error',
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
		>ข้อมูลผู้สอนของ {data.qTeacher?.firstname}
		{data.qTeacher?.lastname} | ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title
	>
</svelte:head>

<h2 class="font-bold text-2xl md:text-4xl mb-4">
	ข้อมูลผู้สอนของ {data.qTeacher?.firstname}
	{data.qTeacher?.lastname}
</h2>

<form class="grid grid-cols-1 gap-2" on:submit|preventDefault={editTeacher}>
	<label class="label">
		<span>ไอดีผู้สอน</span>
		<input class="input px-4 py-2" type="text" value={data.qTeacher?.id} readonly required />
	</label>

	<label class="label">
		<span>ไอดีผู้ใช้งาน</span>
		<input class="input px-4 py-2" type="text" value={data.qTeacher?.user.id} readonly required />
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
			<span>ชื่อเล่น<span class="text-red-500">*</span></span>
			<input
				class="input px-4 py-2"
				type="text"
				placeholder="ชื่อเล่น"
				bind:value={nickname}
				required
			/>
		</label>
	</div>

	<label class="label">
		<span>อีเมล</span>
		<input
			class="input px-4 py-2"
			type="email"
			placeholder="elonmusk@spacex.com"
			readonly
			value={data.qTeacher?.user.email}
			required
		/>
	</label>

	<div class="flex justify-end">
		<Button type="submit" isLoading={busy} class="variant-filled">แก้ไขข้อมูล</Button>
	</div>
</form>
