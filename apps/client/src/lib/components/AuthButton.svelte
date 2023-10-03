<script lang="ts">
  import { PUBLIC_BACKEND_AUTH_URL } from "$env/static/public";
  import { isAuthenticated } from "$lib/stores/is-authenticated";
  import { page } from "$app/stores";
  import {
    Avatar,
    type DrawerSettings,
    getDrawerStore,
  } from "@skeletonlabs/skeleton";
  import { IconChevronDown } from "@tabler/icons-svelte";

  const drawerStore = getDrawerStore();

  const googleSignIn = async () => {
    window.open(PUBLIC_BACKEND_AUTH_URL + "/signin/google", "_self");
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
    <Avatar
      src={$page.data.user?.userAuth.profilePicture}
      width="w-5"
      rounded="rounded-full"
    />
    <p>{$page.data.user?.firstname}</p>
    <IconChevronDown />
  </button>
{:else}
  <button class="btn variant-filled-primary" on:click={googleSignIn}>
    เข้าสู่ระบบด้วยบัญชี Google
  </button>
{/if}
