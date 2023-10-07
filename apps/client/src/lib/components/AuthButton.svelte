<script lang="ts">
  import { page } from "$app/stores";
  import { signIn } from "@auth/sveltekit/client";
  import { isAuthenticated } from "$lib/stores/is-authenticated";
  import {
    Avatar,
    getDrawerStore,
    type DrawerSettings,
  } from "@skeletonlabs/skeleton";
  import { IconArrowBarLeft } from "@tabler/icons-svelte";

  const drawerStore = getDrawerStore();

  const googleSignIn = async () => {
    await signIn("google");
  };

  const toggleDrawer = () => {
    drawerStore.close();

    const settings: DrawerSettings = {
      id: "auth-sidebar",
      position: "right",
      width: "w-[280px]",
    };
    drawerStore.open(settings);
  };
</script>

{#if $isAuthenticated && $page.data.user}
  <button class="btn variant-filled-secondary" on:click={toggleDrawer}>
    <Avatar src={$page.data.user?.image} width="w-5" rounded="rounded-full" />
    {#if $page.data.student}
      <p>{$page.data.student?.firstname}</p>
    {:else}
      <p>{$page.data.user?.email.split("@")[0]}</p>
    {/if}
    <IconArrowBarLeft />
  </button>
{:else}
  <button class="btn variant-filled-primary" on:click={googleSignIn}>
    เข้าสู่ระบบด้วยบัญชี Google
  </button>
{/if}
