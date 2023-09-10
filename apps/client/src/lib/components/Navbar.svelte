<script lang="ts">
  import type { User } from "$lib/types";
  import {
    AppBar,
    getDrawerStore,
    type DrawerSettings,
  } from "@skeletonlabs/skeleton";
  import { IconMenu2 } from "@tabler/icons-svelte";
  import AuthButton from "./AuthButton.svelte";

  const drawerStore = getDrawerStore();

  export let user: User | undefined = undefined;

  const toggleDrawer = () => {
    const settings: DrawerSettings = {
      id: "navbar",
      position: "top",
      height: "h-[280px] md:h-[480px]",
    };
    drawerStore.open(settings);
  };
</script>

<AppBar padding="p-4 md:px-8" shadow="drop-shadow" background="bg-white">
  <svelte:fragment slot="lead">
    <div class="flex gap-8 items-center">
      <a href="/">
        <div class="flex gap-3 justify-center items-center select-none">
          <img
            src="/logo.png"
            alt="THE PRO TUTOR"
            width={40}
            height={40}
            loading="eager"
          />
          <h1 class="text-2xl font-bold">THE PRO TUTOR</h1>
        </div>
      </a>

      <span class="hidden md:block divider-vertical h-10 border-black" />

      <ul class="hidden md:inline-flex gap-4">
        <li class="hover:underline">
          <a href="/courses">คอร์สเรียน</a>
        </li>
        <li class="hover:underline">
          <a href="/tutors">ติวเตอร์</a>
        </li>
      </ul>
    </div>
  </svelte:fragment>

  <svelte:fragment slot="trail">
    <div class="hidden md:block">
      <AuthButton {user} />
    </div>

    <button class="block md:hidden" on:click={toggleDrawer}>
      <IconMenu2 />
    </button>
  </svelte:fragment>
</AppBar>
