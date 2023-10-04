<script lang="ts">
  import { IconLoader2 } from "@tabler/icons-svelte";

  export let isLoading: boolean = false;
  $: isLoading = false;
  export let disabled: boolean = false;

  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<button
  class={`btn ${className}`}
  type="submit"
  disabled={disabled || isLoading}
  on:click
  on:change
  on:keydown
  on:keyup
  on:mouseenter
  on:mouseleave
  {...$$restProps}
>
  {#if isLoading}
    <IconLoader2 class="animate-spin" />
  {:else}
    <slot />
  {/if}
</button>
