<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { isAuthenticated } from "$lib/stores/is-authenticated";
  import { generateAvatarInitials } from "$lib/utils";
  import { signOut } from "@auth/sveltekit/client";
  import { Avatar, getDrawerStore } from "@skeletonlabs/skeleton";
  import {
    IconCalendar,
    IconLayoutDashboard,
    IconTestPipe,
    IconUser,
  } from "@tabler/icons-svelte";

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

  const initials = generateAvatarInitials(data.student, data.user);
</script>

<div class="p-4 flex flex-col gap-4 h-full">
  <div class="flex gap-2 items-center">
    <Avatar
      src={data.user?.image}
      width="w-10"
      rounded="rounded-full"
      {initials}
      background="bg-white"
    />

    <div class="flex flex-col justify-start">
      {#if data.student}
        <p class="-mb-1 font-semibold">{data.student?.studentId}</p>
        <span>{data.student?.firstname} {data.student?.lastname}</span>
      {:else}
        <p>{data.user?.email}</p>
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
      <a href="/scores" class="flex gap-2 items-center" on:click={toggleDrawer}>
        <IconTestPipe />
        คะแนนสอบ
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
