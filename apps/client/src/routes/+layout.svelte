<script lang="ts">
  import { navigating } from "$app/stores";
  import AuthSidebar from "$lib/components/AuthSidebar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import MobileNavbar from "$lib/components/MobileNavbar.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import { modalComponentRegistry } from "$lib/components/modals/registry";
  import { isAuthenticated } from "$lib/stores/is-authenticated";
  import {
    AppShell,
    Drawer,
    Modal,
    Toast,
    getDrawerStore,
    initializeStores,
  } from "@skeletonlabs/skeleton";
  import NProgress from "nprogress";
  import "nprogress/nprogress.css";
  import "../app.css";
  import type { LayoutServerData } from "./$types";
  import { page } from "$app/stores";

  NProgress.configure({
    minimum: 0.16,
    easing: "ease",
    speed: 500,
    showSpinner: false,
  });

  $: {
    if ($navigating) {
      NProgress.start();
    } else NProgress.done();
  }

  initializeStores();
  const drawerStore = getDrawerStore();

  export let data: LayoutServerData;

  if (data.session) {
    isAuthenticated.set(true);
  }
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
<Toast />
<Modal components={modalComponentRegistry} />

<AppShell regionPage="scroll-smooth">
  <svelte:fragment slot="header">
    {#if $page.url.pathname !== "/signin"}
      <Navbar />
    {/if}
  </svelte:fragment>

  <slot />

  <svelte:fragment slot="pageFooter">
    {#if $page.url.pathname !== "/signin"}
      <Footer />
    {/if}
  </svelte:fragment>
</AppShell>
