<script lang="ts">
	import { IconLoader2 } from '@tabler/icons-svelte';

	export let isLoading: boolean = false;
	export let disabled: boolean = false;
	export let type: 'button' | 'reset' | 'submit' = 'button';
	$: isLoading = false;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<button
	class={`btn ${className}`}
	disabled={disabled || isLoading}
	on:click
	on:change
	on:keydown
	on:keyup
	on:mouseenter
	on:mouseleave
	{type}
	{...$$restProps}
>
	{#if isLoading}
		<IconLoader2 class="animate-spin" />
	{:else}
		<slot />
	{/if}
</button>
