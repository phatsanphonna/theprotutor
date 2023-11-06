<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import UserCard from './UserCard.svelte';
	import { IconMenu2 } from '@tabler/icons-svelte';
	import { isSidebarOpen } from '$lib/stores/toggle-sidebar';
	import { page } from '$app/stores';
</script>

<AppBar
	padding="p-4 md:px-8"
	gridColumns="grid-cols-3"
	slotDefault="place-self-center"
	slotTrail="place-content-end"
	shadow="drop-shadow"
	background="bg-white"
>
	<svelte:fragment slot="lead">
		<div class="flex gap-4 items-center">
			<a href="/">
				<div class="flex gap-3 justify-center items-center select-none">
					<img src="/logo.png" alt="THE PRO TUTOR" width={40} height={40} loading="eager" />
				</div>
			</a>
			{#if $page.data.session}
				<button on:click={() => isSidebarOpen.set(!$isSidebarOpen)}>
					<IconMenu2 />
				</button>
			{/if}
		</div>
	</svelte:fragment>

	<h1 class="hidden md:block md:text-xl font-bold">ระบบจัดการหลังบ้าน THE PRO TUTOR</h1>

	<svelte:fragment slot="trail">
		<UserCard />
	</svelte:fragment>
</AppBar>
