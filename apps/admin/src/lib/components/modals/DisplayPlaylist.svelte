<script lang="ts">
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { IconLoader2 } from '@tabler/icons-svelte';
	import { onMount } from 'svelte';

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	let lessons: any[] = [];
	$: busy = false;

	onMount(async () => {
		busy = true;
		const { payload } = await trpc($page).lesson.getLessons.query();
		lessons = payload;
		busy = false;
	});

	const addVideoToLesson = async (lessonId: string) => {
		try {
		const { payload } = await trpc($page).lesson.addVideo.mutate({
			lessonId,
			videoId: $modalStore[0].value.id
		});
		toastStore.trigger({
			message: 'เพิ่มวิดีโอเรียบร้อยแล้ว',
			background: 'variant-filled-success',
			autohide: true,
			timeout: 3000
		});
		modalStore.close();
	} catch (error: any) {
		toastStore.trigger({
			message: error.message,
			background: 'variant-filled-error',
			autohide: true,
			timeout: 3000
		});
	}
	};
</script>

<div class="card flex flex-col w-1/4">
	<header class="card-header">
		<h3 class="font-bold text-2xl">เพิ่มวิดีโอเข้าบทเรียน</h3>
	</header>

	{#if busy}
		<div class="flex flex-col items-center justify-center p-4">
			<IconLoader2 class="animate-spin w-12 h-12" />
		</div>
	{/if}

	<section class="flex p-4 flex-col gap-2">
		{#each lessons as lesson}
			<button
				on:click={() => addVideoToLesson(lesson.id)}
				class="card card-hover variant-ghost-primary"
			>
				<section class="p-2 text-left">
					<p>{lesson.title}</p>
				</section>
			</button>
		{/each}
	</section>
</div>
