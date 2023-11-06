<script lang="ts">
	import { navigating } from '$app/stores';
	import Navbar from '$lib/components/Navbar.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { AppShell, Toast, initializeStores, storePopup } from '@skeletonlabs/skeleton';
	import 'bytemd/dist/index.css';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import '../app.css';
	import type { LayoutData } from './$types';
	import { isSidebarOpen } from '$lib/stores/toggle-sidebar';

	export let data: LayoutData;

	initializeStores();

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	NProgress.configure({
		minimum: 0.16,
		easing: 'ease',
		speed: 500,
		showSpinner: false
	});

	$: {
		if ($navigating) {
			NProgress.start();
		} else {
			NProgress.done();
		}
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
	<meta itemprop="image" content="/thumbnail.jpg" />
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:image" content="/thumbnail.jpg" />
	<meta property="og:image" content="/thumbnail.jpg" />
	<meta name="og:url" content="https://admin.theprotutor.net" />
</svelte:head>

<Toast />

<AppShell>
	<svelte:fragment slot="header">
		<Navbar />
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		{#if data.session && $isSidebarOpen}
			<Sidebar />
		{/if}
	</svelte:fragment>

	<div class="container mx-auto px-4 py-8">
		<slot />
	</div>
</AppShell>
