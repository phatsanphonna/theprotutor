<script lang="ts">
	import { navigating } from '$app/stores';
	import Navbar from '$lib/components/Navbar.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { AppShell, Toast, getDrawerStore, initializeStores } from '@skeletonlabs/skeleton';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import '../app.css';
	import { page } from '$app/stores';
	import { url } from 'inspector';

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
		href="https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
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
		{#if $page.url.pathname === '/'}
			<Sidebar />
		{/if}
	</svelte:fragment>

	<div class="container mx-auto px-4 py-8">
		<slot />
	</div>
</AppShell>
