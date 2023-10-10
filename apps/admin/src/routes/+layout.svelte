<script lang="ts">
	import { navigating, page } from '$app/stores';
	import Navbar from '$lib/components/Navbar.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { AppShell, Toast, initializeStores } from '@skeletonlabs/skeleton';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	initializeStores();

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
		href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai+Looped:wght@100;200;300;400;500;600;700;800;900&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
	<meta itemProp="image" content="/thumbnail.jpg" />
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
		{#if data.session}
			<Sidebar />
		{/if}
	</svelte:fragment>

	<div class="container mx-auto px-4 py-8">
		<slot />
	</div>
</AppShell>
