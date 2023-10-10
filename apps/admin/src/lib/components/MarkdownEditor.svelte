<script lang="ts">
	import { Editor, Viewer } from 'bytemd';
	import gfm from '@bytemd/plugin-gfm';

	export let value: string;
	const plugins = [gfm()];

	const handleChange = (e: any) => {
		value = e.detail.value;
	};
</script>

<Editor {value} {plugins} on:change={handleChange} />
