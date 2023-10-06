<script lang="ts">
  import { goto } from "$app/navigation";
  import { PUBLIC_BACKEND_AUTH_URL } from "$env/static/public";
  import { isAuthenticated } from "$lib/stores/is-authenticated";
  import { Avatar, getDrawerStore } from "@skeletonlabs/skeleton";
  import {
    IconCalendar,
    IconCalendarPlus,
    IconLayoutDashboard,
    IconUser,
  } from "@tabler/icons-svelte";
  import { page } from "$app/stores";
  import { signOut } from "@auth/sveltekit/client";

  const drawerStore = getDrawerStore();
  const { data } = $page;

  const toggleDrawer = () => {
    drawerStore.close();
  };

  const handleSignOut = async () => {
    await signOut();
    isAuthenticated.set(false);
    drawerStore.close();
    goto("/");
  };
</script>

<div class="p-4 flex flex-col gap-4 h-full">
  <div class="flex gap-2 items-center">
    <Avatar src={data.user?.image} width="w-10" rounded="rounded-full" />

    <div class="flex flex-col justify-start">
      {#if $page.data.student}
        <p class="-mb-1 font-medium">{$page.data.student?.studentId}</p>
        <span
          >{$page.data.student?.firstname} {$page.data.student?.lastname}</span
        >
      {:else}
        <p>{$page.data.user?.email}</p>
      {/if}
    </div>
  </div>

  <hr class="!border-t-2" />

  <ul class="flex flex-col gap-1">
    <li>
      <a
        href="/dashboard/assignments"
        class="flex gap-2 items-center"
        on:click={toggleDrawer}
      >
        <IconLayoutDashboard />
        Dashboard
      </a>
    </li>

    <li>
      <a
        href="/appointments"
        class="flex gap-2 items-center"
        on:click={toggleDrawer}
      >
        <IconCalendar />
        ตารางการนัดเรียนชดเชย
      </a>
    </li>

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
