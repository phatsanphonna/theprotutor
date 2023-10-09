<script lang="ts">
	import type { FileType } from 'database';

	export let type: FileType;
</script>

{#if type === 'VIDEO'}
	<span class="badge variant-filled-surface">วิดีโอ</span>
{:else}
	<span class="badge variant-filled">ไฟล์</span>
{/if}
