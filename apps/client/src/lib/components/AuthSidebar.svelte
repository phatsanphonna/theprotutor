<script lang="ts">
  import { goto } from "$app/navigation";
  import { PUBLIC_BACKEND_AUTH_URL } from "$env/static/public";
  import { isAuthenticated } from "$lib/stores/is-authenticated";
  import type { User } from "$lib/types";
  import { Avatar, getDrawerStore } from "@skeletonlabs/skeleton";
  import { IconLayoutDashboard, IconUser } from "@tabler/icons-svelte";

  export let user: User | undefined;
  const drawerStore = getDrawerStore();

  const toggleDrawer = () => {
    drawerStore.close();
  };

  const handleSignOut = async () => {
    try {
      await fetch(PUBLIC_BACKEND_AUTH_URL + "/signout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      isAuthenticated.set(false);
      drawerStore.close();
      goto("/");
    }
  };
</script>

<div class="p-4 flex flex-col gap-4 h-full">
  <div class="flex gap-2 items-center">
    <Avatar
      src={user?.userAuth.profilePicture}
      width="w-10"
      rounded="rounded-full"
    />
    <p>{user?.firstname} {user?.lastname}</p>
  </div>

  <hr class="!border-t-2" />

  <ul>
    <li>
      <a
        href="/dashboard"
        class="flex gap-2 items-center"
        on:click={toggleDrawer}
      >
        <IconLayoutDashboard />
        Dashboard
      </a>
    </li>
  </ul>

  <ul>
    <li>
      <a href="/me" class="flex gap-2 items-center" on:click={toggleDrawer}>
        <IconUser />
        บัญชีผู้ใช้งาน
      </a>
    </li>
  </ul>

  <div class="mt-auto w-full">
    <button class="btn variant-filled-error w-full" on:click={handleSignOut}>
      ออกจากระบบ
    </button>
  </div>
</div>
