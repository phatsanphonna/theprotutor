<script lang="ts">
	import type { FileType } from 'database';

	export let type: FileType;
</script>

{#if type === 'VIDEO'}
	<span class="badge variant-filled-warning">วิดีโอ</span>
{:else}
	<span class="badge variant-soft-success">ไฟล์</span>
{/if}
