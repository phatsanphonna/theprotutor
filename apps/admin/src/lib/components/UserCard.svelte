<script>
	import { page } from '$app/stores';
	import { Avatar } from '@skeletonlabs/skeleton';
</script>

{#if $page.data.session}
	<div class="card variant-filled-secondary">
		<section class="card-body p-2 flex gap-2">
			<Avatar src={$page.data.session?.user?.image || ''} width="w-6" rounded="rounded-full" />
			<span>{$page.data.session?.user?.email?.split('@')[0]}</span>
		</section>
	</div>
{/if}
