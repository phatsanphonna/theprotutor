<script lang="ts">
  import AuthSidebar from "$lib/components/AuthSidebar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import MobileNavbar from "$lib/components/MobileNavbar.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import {
    AppShell,
    Drawer,
    getDrawerStore,
    initializeStores,
  } from "@skeletonlabs/skeleton";
  import "../app.css";
  import type { LayoutServerData } from "./$types";
  import { isAuthenticated } from "$lib/stores/is-authenticated";

  initializeStores();

  export let data: LayoutServerData;

  if (data.user) {
    isAuthenticated.set(true);
  }

  const drawerStore = getDrawerStore();
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossOrigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    rel="stylesheet"
  />
  <meta itemProp="image" content="/thumbnail.jpg" />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:image" content="/thumbnail.jpg" />
  <meta property="og:image" content="/thumbnail.jpg" />
  <meta name="og:url" content="https://theprotutor.net" />
</svelte:head>

<Drawer>
  {#if $drawerStore.id === "navbar"}
    <MobileNavbar />
  {:else if $drawerStore.id === "auth-sidebar"}
    <AuthSidebar />
  {/if}
</Drawer>

<AppShell>
  <svelte:fragment slot="header">
    <Navbar />
  </svelte:fragment>

  <slot />

  <svelte:fragment slot="footer">
    <Footer />
  </svelte:fragment>
</AppShell>
