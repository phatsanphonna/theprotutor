<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import { page } from '$app/stores';

	const handleSignIn = async () => {
		await signIn('google');
	};
</script>

<svelte:head>
	<title>ระบบจัดการหลังบ้าน สถาบันกวดวิชาเดอะโปร - THE PRO TUTOR</title>
</svelte:head>


<div class="flex flex-col justify-center items-center gap-4">
	<h2 class="font-bold text-2xl">ระบบจัดการหลังบ้าน THE PRO TUTOR</h2>
	{#if $page.data.session}
		<a href="/dashboard" class="btn variant-filled-primary">ไปยังหน้าแดชบอร์ด</a>
	{:else}
		<button class="btn variant-filled-primary" on:click={handleSignIn}>
			เข้าสู่ระบบด้วยบัญชี Google
		</button>
	{/if}
</div>
